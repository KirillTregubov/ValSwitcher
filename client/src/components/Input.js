import React from 'react';

export default function Input({ className, value, onChange, placeholder, type, autoComplete, minLength }) {
	return <input className={`w-full p-2 rounded-md placeholder-zinc-400 text-zinc-200 bg-zinc-600 border shadow-sm border-zinc-700 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 transition-all ${className}`} value={value} onChange={onChange} placeholder={placeholder} type={type} autoComplete={autoComplete} minLength={minLength} />
}
