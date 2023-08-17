import styled from "styled-components";

const Table_ = styled.table`
    display: block;
    justify-content: center;
    align-items: center;
`;

const Tr = styled.tr`
    gap: 1rem;
    margin: 0.25rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-radius: 1rem;
    transition: ${(p) => p.theme.transition.fast};

    :hover {
        background-color: ${(p) => p.theme.color.lightBlue};
    }
`;

const Th = styled.th`
    border-radius: 1rem;
    padding: 1rem;
    background-color: ${(p) => p.theme.color.lightBlue};
    text-align: center;
    font-weight: 600;
    color: ${(p) => p.theme.color.textColor};
`;

const Td = styled.td`
    padding: 1rem;
    text-align: center;
    color: ${(p) => p.theme.color.textColor};
`;

interface TableProps {
    titleRow?: string[];
    contentRows?: (string | number)[][];
}

const Table = ({ contentRows, titleRow }: TableProps) => {
    if (
        !titleRow ||
        !contentRows ||
        titleRow.length !== contentRows[0]?.length
    ) {
        console.warn(
            "title row's length must be equal to content row's length."
        );

        return null;
    }

    return (
        <Table_>
            <thead>
                <Tr>
                    {titleRow.map((cell, idx) => (
                        <Th key={`${cell}__${idx}`}>{cell}</Th>
                    ))}
                </Tr>
            </thead>
            <tbody>
                {contentRows.map((row, rowIdx) => (
                    <Tr key={`${row}__${rowIdx}`}>
                        {row.map((cell, cellIdx) => (
                            <Td key={`${row}__${cell}__${cellIdx}`}>{cell}</Td>
                        ))}
                    </Tr>
                ))}
            </tbody>
        </Table_>
    );
};

export default Table;
