
'use-client';

import React, { Children } from 'react'
import clsx from 'clsx'

function Button({
    type, 
    label, 
    onClick, 
    secondary, 
    disabled,
    danger,
    children,
    fullWidth
}) {
  return (
    <button
        type={type}
        disabled={disabled}
        className={clsx(`
            flex justify-center 
            rounded-md 
            text-sm
            font-semibold
            focus-visible:outline
            focus-visible:outline-2
            py-2
        `,
        disabled && "opacity-50 cursor-default",
        fullWidth && "w-full",
        secondary ? 'text-gray-900': 'text-white',
        danger && "bg-rose-500 hover:bg-rose-600",
        !secondary && !danger && 'bg-sky-500 hover:bg-sky-600'
        )}
        
    
    >{children}</button>
  )
}

export default Button