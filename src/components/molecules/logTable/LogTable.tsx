import { Table } from "@components/atoms";
import formatDate from "@libs/formatDate";

interface LogInterface {
    created_at: number;
    comment: string;
    amount: number;
}

interface LogTableProps {
    logs?: LogInterface[];
}

const titleRow = ["일시", "내용", "변화"];

const LogTable = ({ logs }: LogTableProps) => {
    return (
        <Table
            titleRow={titleRow}
            contentRows={logs?.map((log) => [
                formatDate(log.created_at),
                log.comment,
                log.amount,
            ])}
        />
    );
};

export default LogTable;
