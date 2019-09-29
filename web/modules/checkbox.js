import React from 'react';

export default function Checkbox({ checked, onChange }) {
    return (
        <div
            className="checkbox"
            onClick={onChange}
        >
            <svg
                width={9}
                height={9}
                viewBox="0 0 80 80"
            >
                {checked && (
                    <path
                        d="M14 30L0 44 37 76 80 11 65 0 34 50z"
                    />
                )}
            </svg>
            <input
                hidden
                aria-hidden="false"
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
        </div>
    );
}
