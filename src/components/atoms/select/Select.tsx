import {
    type FC,
    type MutableRefObject,
    type ChangeEvent,
    forwardRef,
    useState,
    useCallback,
} from "react";
import styled from "styled-components";

const Select_ = styled.select`
    border: ${(p) => p.theme.border.nonActive};
    transition: ${(p) => p.theme.transition.fast};
    border-radius: ${(p) => p.theme.border.radius};
    cursor: pointer;
    padding: 1rem;

    :hover {
        opacity: 0.7;
        border: ${(p) => p.theme.border.active};
    }

    :focus {
        outline: none;
        border: ${(p) => p.theme.border.active};
    }
`;

const Option_ = styled.option`
    font-size: 2rem;
`;

interface SelectProps {
    options: string[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    selectedValue: string;
    id?: string;
    className?: string;
}

const Select: FC<SelectProps> = forwardRef(
    (
        { options, onChange, className, selectedValue, id, ...rest },
        selectRef
    ) => {
        return (
            <Select_
                id={id}
                ref={selectRef as MutableRefObject<HTMLSelectElement>}
                value={selectedValue}
                className={className}
                onChange={onChange}
                role="combobox"
                {...rest}
            >
                {options.map((opt, idx) => (
                    <Option_ key={`${opt}_${idx}`} value={opt}>
                        {opt}
                    </Option_>
                ))}
            </Select_>
        );
    }
);

Select.displayName = "Select";

export default Select;
