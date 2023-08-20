import { Button, Heading, Input, Form } from "@components/atoms";
import LabelWrapper from "../labelWrapper/LabelWrapper";
import { useForm } from "react-hook-form";
import useFetch from "@libs/useFetch";

interface CheckEmailFormInterface {
    email: string;
}

interface CheckEmailFormReturn {
    status: boolean;
    error?: string;
    data?: { resetQuestion: string };
}

interface CheckEmailFormProps {
    onSuccess: (email: string, resetQuestion: string) => void;
    onError: Function;
}

const CheckEmailForm = ({ onSuccess, onError }: CheckEmailFormProps) => {
    const { register, setError, handleSubmit } =
        useForm<CheckEmailFormInterface>({
            mode: "onBlur",
        });

    const onSubmit = (formData: CheckEmailFormInterface) => {
        try {
            useFetch<CheckEmailFormInterface, CheckEmailFormReturn>(
                "http://localhost:8080/user/reset",
                "PUT",
                formData
            ).then(({ data, error }) => {
                if (data) {
                    onSuccess(formData.email, data.resetQuestion);
                } else {
                    onError(error);
                }
            });
        } catch (err) {
            onError(err);
        }
    };

    return (
        <>
            <Heading>이메일 확인</Heading>
            <Form
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
