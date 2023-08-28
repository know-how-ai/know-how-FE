import { LabelWrapper } from "@components/molecules";
import Layout from "../../layout";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    Badge,
    BadgeContainer,
    Button,
    Form,
    Heading,
    Input,
    ToolTip,
} from "@components/atoms";
import type { NextPage } from "next";
import useFetchService from "@libs/useFetchService";
import { setInit, useResultSelector } from "@contexts/resultSlice";
import { useAppDispatch } from "@contexts/contextHooks";
import { URLs } from "@libs/urls";

interface IResult {
    status: boolean;
    error?: string;
    result?: string[];
}

interface IRequest {
    personalities: string[];
}

const ToolTipContents: string[] = [
    "How to use?",
    "본인이 갖고 있는 다양한 성향을 입력해서 추가해보세요.",
    "인공지능이 성향들과 어울리는 직업과 어울리지 않는 직업을 추천해드릴게요.\n이를 통해 자신에게 어울리는 직업을 찾아보세요.",
    "입력한 내용은 분석을 위해서만 사용되며, 저장되지 않아요.\n서비스 이용시 1 point가 차감됩니다. ",
];

const JobTitle: string = "직업 추천 봇";

const Job: NextPage = () => {
    const dispatch = useAppDispatch();
    const { isLoading } = useResultSelector(({ result }) => result);

    const inputRef = useRef<HTMLInputElement>(null);
    const [personalities, setPersonalities] = useState<string[]>([]);

    const onSubmit = useFetchService<IRequest, IResult>({
        fetchUrl: URLs.GPT.JOB,
        afterFetchUrl: "/job/result",
        target: "job",
    });

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();

        // 아무 것도 추가하지 않았을 경우
        if (personalities.length === 0) {
            return;
        }

        // await 없으면 dispatch 이전에 response가 먼저 도착해버려서 오류 발생.
        await onSubmit({ personalities });
    };

    useEffect(() => {
        dispatch(setInit({ target: "job" }));
    }, []);

    const onClickAdd = useCallback(() => {
        // save value if not empty
        if (inputRef?.current?.value && inputRef.current.value !== "") {
            setPersonalities([...personalities, inputRef.current.value]);

            // then reset field
            inputRef.current.value = "";
        } else {
            // Focus if empty the 'my personality' input
            inputRef.current?.focus();
        }
    }, [personalities, inputRef]);

    const onClickRemove = useCallback(
        (target: number) => {
            setPersonalities(personalities.filter((_, i) => i !== target));
        },
        [personalities]
    );

    return (
        <Layout title={JobTitle} widgets={{ profile: true, theme: true }}>
            <Heading>{JobTitle}</Heading>

            <ToolTip contents={ToolTipContents} />

            <Form
                display="flex"
                gap={2}
                justifyContent="center"
                alignItems="center"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <LabelWrapper label="나의 성향">
                    <Input
                        ref={inputRef}
                        type="text"
                        placeholder="Ex. 끈기, 섬세함, ..."
                    />
                </LabelWrapper>
                <Button onClick={onClickAdd}>추가</Button>
            </Form>

            {personalities.length ? (
                <BadgeContainer>
                    {personalities.map((v, i) => (
                        <Badge
                            onClick={() => {
                                onClickRemove(i);
                            }}
                            active={true}
                            key={i}
                        >
                            {v}
                        </Badge>
                    ))}
                </BadgeContainer>
            ) : null}

            <Form
                onSubmit={handleSubmit}
                display="flex"
                gap={2}
                alignItems="center"
                justifyContent="center"
            >
                <Button isLoading={isLoading}>추천받기</Button>
            </Form>
        </Layout>
    );
};

Job.displayName = "Job";

export default Job;
