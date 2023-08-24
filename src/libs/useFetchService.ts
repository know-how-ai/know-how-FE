import { useAppDispatch } from "@contexts/contextHooks";
import {
    setLoading,
    setRequest,
    setResponse,
    unsetLoading,
} from "@contexts/resultSlice";
import { setToast } from "@contexts/uiSlice";
import { useRouter } from "next/router";
import useFetch from "./useFetch";
import { useUserSelector, spendPoint } from "@contexts/userSlice";

interface IUseFetchService {
    fetchUrl: string;
    afterFetchUrl: string;
    target: "coverletter" | "interview" | "job";
}

interface IRegularResponse<T> {
    status: boolean;
    error?: string;
    data?: {
        result: T;
    };
}

const useFetchService = <FormDataType, ResultType>({
    fetchUrl,
    afterFetchUrl,
    target,
}: IUseFetchService) => {
    const { push } = useRouter();
    const dispatch = useAppDispatch();
    const { data } = useUserSelector(({ user }) => user);

    return async (formData: FormDataType) => {
        try {
            dispatch(setLoading());
            dispatch(
                setToast({
                    toast: "인공지능이 결과를 분석하고 있어요.\n잠시만 기다려주세요.",
                })
            );

            const { error, data } = await useFetch<
                FormDataType,
                IRegularResponse<ResultType>
            >(fetchUrl, "POST", formData);

            if (data && !error) {
                console.log(data);

                dispatch(setResponse({ target, data: data?.result }));
                dispatch(setRequest({ target, data: formData }));

                dispatch(spendPoint());
                dispatch(unsetLoading());

                push(afterFetchUrl);
            } else if (error) {
                dispatch(setToast({ toast: error }));
                dispatch(unsetLoading());
            }
        } catch (err) {
            console.warn(err);
            dispatch(
                setToast({ toast: "서버가 불안정합니다.\n다시 시도해주세요." })
            );
            dispatch(unsetLoading());
        }
    };
};

export default useFetchService;
