import React from 'react'

export default function Input({
  className,
  value,
  onChange,
  onKeyDown,
  placeholder,
  type,
  autoComplete,
  minLength
}) {
  return (
    <input
      className={`w-full rounded-md border border-zinc-700 bg-zinc-600 p-2 text-zinc-200 placeholder-zinc-400 shadow-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-zinc-500 ${className}`}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      type={type}
      autoComplete={autoComplete}
      minLength={minLength}
    />
  )
}
