import {
    type FC,
    type MutableRefObject,
    type ChangeEvent,
    forwardRef,
} from "react";
import styled from "styled-components";

interface StyleProps {
    disabled?: boolean;
}

const Select_ = styled.select`
    color: ${(p) => p.theme.color.textColor};
    border: none;
    border-top: ${(p) => p.theme.border.inactive};
    border-bottom: ${(p) => p.theme.border.gray};
    transition: ${(p) => p.theme.transition.fast};
    margin: ${(p) => p.theme.size.xs};
    margin-top: 0.75rem;
    padding: ${(p) => p.theme.size.xs};
    padding-right: 2rem;
    background-color: transparent;

    ::placeholder {
        font-style: italic;
    }

    :disabled {
        cursor: not-allowed;
    }

    :hover:not(:disabled) {
        border-bottom: ${(p) => p.theme.border.inactive};
    }

    :focus:not(:disabled) {
        outline: none;
        border-bottom: ${(p) => p.theme.border.inactive};
    }
`;

const Option_ = styled.option`
    font-size: 2rem;
`;

interface SelectProps extends StyleProps {
    options?: string[];
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    selectedValue?: string;
    id?: string;
    className?: string;
    required?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    isFocused?: boolean;
    ariaControls?: string;
}

const Select: FC<SelectProps> = forwardRef(
    (
        {
            options,
            onChange,
            className,
            selectedValue,
            disabled,
            id,
            required,
            onFocus,
            onBlur,
            isFocused = false,
            ariaControls,
        },
        selectRef
    ) => {
        return (
            <Select_
                required={required}
                disabled={disabled}
                id={id}
                ref={selectRef as MutableRefObject<HTMLSelectElement>}
                value={selectedValue}
                className={className}
                onChange={onChange}
                role="combobox"
                onBlur={onBlur}
                onFocus={onFocus}
                aria-expanded={isFocused}
                aria-controls={ariaControls}
            >
                {options?.map((opt, idx) => (
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
