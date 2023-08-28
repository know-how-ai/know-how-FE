import { Button, Heading, Input, Form } from "@components/atoms";
import LabelWrapper from "../labelWrapper/LabelWrapper";
import { useForm } from "react-hook-form";
import useFetch from "@libs/useFetch";
import { URLs } from "@libs/urls";

interface ICheckEmailForm {
    email: string;
}

interface ResponseReturn {
    status: boolean;
    error?: string;
    data?: { resetQuestion: string };
}

interface CheckEmailFormProps {
    onSuccess: (email: string, resetQuestion: string) => void;
    onError: Function;
}

const CheckEmailForm = ({ onSuccess, onError }: CheckEmailFormProps) => {
    const { register, handleSubmit } = useForm<ICheckEmailForm>({
        mode: "onBlur",
    });

    const onSubmit = async (formData: ICheckEmailForm) => {
        try {
            const { data, error } = await useFetch<
                ICheckEmailForm,
                ResponseReturn
            >(URLs.USER.RESET, "POST", formData);

            if (data) {
                onSuccess(formData.email, data.resetQuestion);
            } else if (error) {
                onError(error);
            }
        } catch (err) {
            onError(err);
        }
    };

    return (
        <>
            <Heading>이메일 확인</Heading>
            <Form
                ariaLabel="checking email form"
                ariaDescription="checking email form for reset password"
                onSubmit={handleSubmit(onSubmit)}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={2}
            >
                <LabelWrapper label="이메일">
                    <Input
                        placeholder="가입한 이메일을 입력해주세요."
                        type="email"
                        ariaLabel={`Email Input for reset password`}
                        autoComplete="off"
                        autoCorrect="off"
                        register={register("email", {
                            required: true,
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                message: "올바른 이메일 주소를 입력해 주세요.",
                            },
                        })}
                    />
                </LabelWrapper>
                <Button>확인하기</Button>
            </Form>
        </>
    );
};

export default CheckEmailForm;
