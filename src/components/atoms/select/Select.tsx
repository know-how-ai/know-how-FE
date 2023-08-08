import { type FC, type MutableRefObject, forwardRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

const Select_ = styled.select`
    color: ${(p) => p.theme.color.textColor};
    border: none;
    border-bottom: ${(p) => p.theme.border.gray};
    transition: ${(p) => p.theme.transition.fast};
    margin: ${(p) => p.theme.size.xs};
    margin-top: 0.75rem;
    padding: ${(p) => p.theme.size.xs};

    ::placeholder {
        font-style: italic;
    }

    :disabled {
        cursor: not-allowed;
    }

    :hover {
        border-bottom-color: ${(p) => p.theme.color.blue};
    }

    :focus,
    :active {
        outline: none;
        border-bottom-color: ${(p) => p.theme.color.blue};
    }
`;

const Option_ = styled.option`
    font-size: 2rem;
`;

interface SelectProps {
    options?: string[];
    id?: string;
    className?: string;
    ariaControls?: string;
    register?: UseFormRegisterReturn;
    [key: string]: any;
}

const Select: FC<SelectProps> = forwardRef(
    (
        { options, className, id, ariaControls, register, ...rest },
        selectRef
    ) => {
        return (
            <Select_
                id={id}
                ref={selectRef as MutableRefObject<HTMLSelectElement>}
                className={className}
                role="combobox"
                aria-controls={ariaControls}
                {...register}
                {...rest}
            >
                {options?.map((opt, idx) => (
                    <Option_ key={`${opt}_${idx}`} value={opt} role="option">
                        {opt}
                    </Option_>
                ))}
            </Select_>
        );
    }
);

Select.displayName = "Select";

export default Select;
