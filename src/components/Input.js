import React from 'react'

export default function Input({
  className,
  value,
  onChange,
  onKeyDown,
  placeholder,
  type,
  autoComplete,
  minLength,
  title = ''
}) {
  return (
    <input
      className={`w-full rounded-md border border-neutral-700 bg-neutral-800 p-2 text-neutral-200 placeholder-neutral-500 shadow-sm outline-none transition-all duration-200 hover:border-neutral-500 hover:ring-1 hover:ring-neutral-500 focus-visible:border-neutral-700 focus-visible:bg-neutral-900 focus-visible:ring-1 focus-visible:ring-neutral-700 ${className}`}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      type={type}
      autoComplete={autoComplete}
      minLength={minLength}
      title={title}
    />
  )
}
