import React, { useState } from 'react';
import { ExclamationIcon } from '@heroicons/react/solid';

export default function AuthRegister({ setLogin }) {
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [warning, setWarning] = useState(null);
	const [repeatWarning, setRepeatWarning] = useState(null);

	const handleInput = (e) => {
		setPassword(e.target.value);

		if (e.target.value.length > 0) {
			setWarning(null);
		} else {
			setWarning('Password cannot be empty.');
		}
	}

	const handleRepeatInput = (e) => {
		setRepeatPassword(e.target.value);

		if (password.length > 0 && e.target.value === password) {
			setIsValid(true);
			setRepeatWarning(null);
		} else {
			setIsValid(false);
		}
	}

	const submitPassword = (e) => {
		if (password.length > 0 && repeatPassword === password) {
			setIsValid(true);
		}

		if (!isValid) {
			if (password.length === 0) {
				setWarning('Password cannot be empty.');
				return;
			}
			setRepeatWarning('Passwords must match.');
			return;
		}

		const response = window.app.emitSync('authenticate-register', {
			password: password
		});
		if (response) {
			setLogin(true);
		} else {
			// TODO: ERROR
			alert('We ran into an error...')
		}
	}

	return <div className="w-full max-w-md py-6 px-12 text-zinc-300">
		<h2 className="mb-2 text-lg font-medium text-zinc-200">Welcome to <span className="text-valred">Valorant</span> Switcher!</h2>
		<p className="mb-2">Valorant Switcher stores and automatically switches between accounts in the Riot Client, allowing you to switch between Valorant accounts with ease.</p>
		<p>For your security, please set a master password to secure your account data with. Do NOT re-use an account password.</p>
		<div className="my-3 space-y-2">
			<input className="w-full p-2 rounded placeholder-zinc-400 text-zinc-200 bg-zinc-600 border shadow-sm border-zinc-700 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 transition-all" placeholder="Master Password" minLength="1" autoComplete="new-password" type="password" value={password} onChange={handleInput}></input>
			{warning && <p className="flex items-center text-amber-500 -mt-1 mb-3 animate-pulse"><ExclamationIcon className="w-6 h-6 mr-1" />{warning}</p>}
			<input className="w-full p-2 rounded placeholder-zinc-400 text-zinc-200 bg-zinc-600 border shadow-sm border-zinc-700 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 transition-all" placeholder="Repeat Master Password" minLength="1" autoComplete="new-password" type="password" value={repeatPassword} onChange={handleRepeatInput}></input>
			{repeatWarning && <p className="flex items-center text-amber-500 -mt-1 mb-3 animate-pulse"><ExclamationIcon className="w-6 h-6 mr-1" />{repeatWarning}</p>}
		</div>
		<div className="flex gap-2 mt-1">
			<button className="w-full px-3 py-2 text-sm font-medium rounded-md border transition-all text-zinc-900 bg-zinc-100 border-zinc-300 hover:bg-zinc-300 hover:border-zinc-400 hover:scale-105 focus-visible:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500" onClick={submitPassword}>Set Password</button>
		</div>
	</div>
};
