import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ExclamationIcon } from '@heroicons/react/solid';
import Input from '../components/Input';
import { Transition } from '../components/Transition';

export default function AuthRegister() {
	let navigate = useNavigate();
	const [password, setPassword] = useState('');
	const [warning, setWarning] = useState(null);
	const [repeatPassword, setRepeatPassword] = useState('');
	const [repeatWarning, setRepeatWarning] = useState(null);
	const [isValid, setIsValid] = useState(false);

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
			navigate('/');
		} else {
			// TODO: ERROR
			alert('We ran into an error...');
			setWarning('');
			setRepeatWarning('An error occurred.');
		}
	}

	return <Transition show={true}>
		<div className="w-full max-w-md py-6 px-12 text-zinc-300">
			<h2 className="mb-2 text-lg font-medium text-zinc-200">Welcome to <span className="text-valred">Valorant</span> Switcher!</h2>
			<p className="mb-2">Valorant Switcher stores and automatically switches between accounts in the Riot Client, allowing you to switch between Valorant accounts with ease.</p>
			<p>For your security, please set a master password to secure your account data with. Do NOT re-use an account password.</p>
			<div className="my-3 space-y-2">
				<Input value={password} onChange={handleInput} placeholder="Master Password" type="password" autoComplete="new-password" minLength="1" />
				{warning && <p className="flex items-center text-amber-500 -mt-1 mb-3 animate-pulse"><ExclamationIcon className="w-6 h-6 mr-1" />{warning}</p>}
				<Input value={repeatPassword} onChange={handleRepeatInput} placeholder="Repeat Master Password" type="password" autoComplete="new-password" minLength="1" />
				{repeatWarning && <p className="flex items-center text-amber-500 -mt-1 mb-3 animate-pulse"><ExclamationIcon className="w-6 h-6 mr-1" />{repeatWarning}</p>}
			</div>
			<div className="flex gap-2 mt-1">
				<button className="w-full px-3 py-2 text-sm font-medium rounded-md border transition-all text-zinc-900 bg-zinc-100 border-zinc-300 hover:bg-zinc-300 hover:border-zinc-400 hover:scale-105 focus-visible:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500" onClick={submitPassword}>Set Password</button>
			</div>
		</div>
	</Transition>
}
