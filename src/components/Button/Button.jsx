import React from 'react'



const Button = React.forwardRef((props, ref) => {
    const { label, className, isBgColor, ...otherProps } = props;

    let buttonClass = '';
    if (isBgColor) {
        buttonClass = `px-6 py-[6px] text-sm font-medium text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none disabled:cursor-not-allowed ${className}`;
    } else {
        buttonClass = `px-6 py-[6px] text-sm font-medium text-violet-600 bg-white border border-violet-600 rounded active:text-white hover:bg-violet-600 hover:text-white focus:outline-none disabled:cursor-not-allowed ${className}`;
    }

    return (
        <button ref={ref} className={buttonClass} {...otherProps}>
            {label}
        </button>
    );
})

export default Button
