import React from 'react'

const Button = (props) => {

    var themeClasses = ""
    switch (props.variant) {
        case "dark":
            themeClasses = "bg-slate-800 text-white"
            break;
        case "dark-outline":
            themeClasses = "bg-slate-800 text-white-dim border border-slate-600"
            break;
        case "primary":
            themeClasses = "bg-primary text-white"
            break;
        case "primary-outline":
            themeClasses = "bg-primary text-white border border-slate-600"
            break;
        default:
            // copy primary
            themeClasses = "bg-primary text-white"
            break;
    }

    var sizeClasses = ""
    switch (props.size) {
        case "xs":
            sizeClasses = "p-2 min-w-16";
            break;
        case "sm":
            sizeClasses = "p-3 min-w-16";
            break;
        case "md":
            sizeClasses = "p-4";
            break;
        case "xl":
            sizeClasses = "p-5";
            break;
        case "2xl":
            sizeClasses = "p-6";
            break;
        default:
            // copy sm
            sizeClasses = "p-3 min-w-16";
            break;
    }

    return (
        <>
            <button {...props}
                className={
                    themeClasses + " " + sizeClasses + " " +
                    "rounded-md drop-shadow-xl"
                }>
                {props.children}
            </button>
        </>
    )
}

export default Button;