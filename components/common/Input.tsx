import React, { useState } from 'react';
import { css, cx } from '@emotion/css';

const InputClass = css`
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 30px;

    display: flex;
    align-items: center;

    color: #0f1928;
    background: rgba(34, 85, 247, 0.05);
    border-radius: 8px;
    padding: 14px 24px;
    border: 1px solid #e7e8e9;
    width: 100%;
    &:focus {
        background: white;
        border: 1px solid #2255f7;
        outline: none;
    }
    &:not(:placeholder-shown) {
        background: white;
    }
    &:placeholder {
        color: #6f757e;
    }
`;

const CheckboxClass = css`
    width: 20px;
    height: 20px;
    border: 1px solid #e7e8e9;
    border-radius: 4px;
    margin: 0 8px 0 0;
`;

const ErrorInputClass = css`
    border-color: #f04848;
    &:focus {
        border-color: #f04848;
    }
`;
const ErrorMessageClass = css`
    color: #f04848;
    padding-top: 4px;
    padding-bottom: 4px;
`;

const LabelClass = css`
    display: block;
    color: #2255f7;
    position: absolute;
    top: -13px;
    left: 22px;
    background: #fff;
    padding: 3px 16px;
`;
const ErrorLabelClass = css`
    color: #f04848;
`;

export enum InputType {
    TEXT = 'text',
    PASSWORD = 'password',
    CHECKBOX = 'checkbox',
    TEXTAREA = 'textarea',
}

const Input: React.FC<{
    label: string;
    placeholder?: string;
    type?: InputType;
    id?: string;
    value: string | boolean | number;
    name?: string;
    errorMessage?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, placeholder, type = InputType.TEXT, id, name, onChange, errorMessage, value: initialVal }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState(initialVal);
    const GetAnyAdditionalClass = (type: string): string[] => {
        const arr = [];
        if (type === InputType.CHECKBOX) {
            arr.push(CheckboxClass);
        }
        return arr;
    };

    const isLabelRequired = () => {
        if (type === InputType.CHECKBOX) return false;
        if (isFocused || value) {
            return true;
        }
        return false;
    };

    return (
        <div style={{ position: 'relative' }}>
            {isLabelRequired() && (
                <label className={cx([LabelClass, errorMessage && ErrorLabelClass])}>{label}</label>
            )}
            <input
                placeholder={placeholder}
                className={cx([
                    InputClass,
                    GetAnyAdditionalClass(type),
                    errorMessage && ErrorInputClass,
                ])}
                type={type}
                name={name}
                id={id}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e);
                }}
                defaultValue={initialVal.toString()}
            />
            <div className={ErrorMessageClass}>
                <span>{errorMessage}</span>
            </div>
        </div>
    );
};

export default Input;
