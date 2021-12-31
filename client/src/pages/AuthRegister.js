import React from 'react';

export default function AuthRegister() {
	return <div className="w-full max-w-md py-6 px-12 text-zinc-300">
		<h2 className="mb-2 text-lg font-medium text-zinc-200">Welcome to <span className="text-valred">Valorant</span> Switcher!</h2>
		<p className="mb-2">Valorant Switcher stores and automatically switches between accounts in the Riot Client, allowing you to switch accounts in Valorant with ease.</p>
		<p>For your security, please set a master password to secure your account data with. Do NOT re-use an account password.</p>
		<div className="my-3 space-y-2">
			<input className="w-full p-2 rounded placeholder-zinc-400 text-zinc-200 bg-zinc-600 border shadow-sm border-zinc-700 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 transition-all" placeholder="Master Password" minLength="1" autoComplete="password" type="password"></input>
			<input className="w-full p-2 rounded placeholder-zinc-400 text-zinc-200 bg-zinc-600 border shadow-sm border-zinc-700 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 transition-all" placeholder="Repeat Master Password" minLength="1" autoComplete="password" type="password"></input>
		</div>
		<div className="flex gap-2 mt-1">
			<button className="w-full px-3 py-2 text-sm font-medium rounded-md border transition-all text-zinc-900 bg-zinc-100 border-zinc-300 hover:bg-zinc-300 hover:border-zinc-400 hover:scale-105 focus-visible:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500">Set Password</button>
		</div>
	</div>
};
