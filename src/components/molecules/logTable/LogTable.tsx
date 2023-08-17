import { Table } from "@components/atoms";
import { useCallback } from "react";

interface LogInterface {
    createdAt: number;
    comment: string;
    amount: number;
}

interface LogTableProps {
    logs?: LogInterface[];
}

const titleRow = ["일시", "내용", "변화"];

const LogTable = ({ logs }: LogTableProps) => {
    const formatDate = useCallback((date: number) => {
        const diff = Date.now() - date; // 차이(ms)

        // 차이가 1초 미만이라면
        if (diff < 1000) {
            return "현재";
        }

        // 차이를 초로 변환
        const sec = Math.floor(diff / 1000);
        if (sec < 60) {
            return sec + "초 전";
        }

        // 차이를 분으로 변환
        const min = Math.floor(diff / 60000);
        if (min < 60) {
            return min + "분 전";
        }

        // 날짜 포맷 변경
        // 일, 월, 시, 분이 한 자릿수인 경우, 앞에 0을 추가
        const newDate = new Date(date);
        const d = [
            "0" + newDate.getDate(),
            "0" + (newDate.getMonth() + 1),
            "" + newDate.getFullYear(),
            "0" + newDate.getHours(),
            "0" + newDate.getMinutes(),
        ].map((component) => component.slice(-2)); // 모든 컴포넌트의 마지막 숫자 2개를 가져옴

        // 컴포넌트를 조합
        return d.slice(0, 3).join(".") + " " + d.slice(3).join(":");
    }, []);

    return (
        <Table
            titleRow={titleRow}
            contentRows={logs?.map((log) => [
                formatDate(log.createdAt),
                log.comment,
                log.amount,
            ])}
        />
    );
};

export default LogTable;
