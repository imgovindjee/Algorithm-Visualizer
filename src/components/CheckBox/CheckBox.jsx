import React, { forwardRef } from 'react'

const inactiveClass = "inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium leading-5 text-slate-500 shadow-sm duration-150 ease-in-out hover:border-slate-300";
const activeClass = "inline-flex items-center justify-center rounded-full border border-transparent bg-indigo-500 px-3 py-1 text-sm font-medium leading-5 text-white shadow-sm duration-150 ease-in-out";


const CheckBox = forwardRef((props, ref) => {

    const { label, checked, ...otherProps } = props;
    const className = checked ? activeClass : inactiveClass;

    return (
        <div className="m-1">
            <button
                ref={ref}
                className={className}
                {...otherProps}
            >
                {label}
            </button>
        </div>
    )
})

export default CheckBox
