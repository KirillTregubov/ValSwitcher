import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ExclamationIcon } from '@heroicons/react/solid';
import Input from '../components/Input';
// import { Transition } from '../components/Transition';
// import { navigateWithDelay } from '../util';

export default function AuthLogin() {
	let navigate = useNavigate();
	// const [show, setShow] = useState(true);
	const [password, setPassword] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [warning, setWarning] = useState(null);

	const handleInput = (e) => {
		setPassword(e.target.value);

		if (e.target.value.length > 0) {
			setIsValid(true);
			setWarning('');
		} else {
			setIsValid(false);
		}
	}

	const handleEnter = (e) => {
		if (e.keyCode === 13) {
			login();
		}
	}

	const login = (e) => {
		if (!isValid) {
			setWarning('Password cannot be empty.');
			return;
		}

		// 'Mypassword1'
		const response = window.app.emitSync('authenticate-login', {
			password: password
		});

		if (response) {
			navigate('/');
		} else if (response === false) {
			setWarning('Incorrect password.');
		}
	}

	const resetData = async (e) => {
		// TODO: Trigger confirmation
		// TODO: Make method that resets data

		// setShowLogin(false);
		// setTimeout(() => { setShowRegister(true); }, 800);
		console.log('reset data');
		navigate('/register');
	}

	return <div className="w-full max-w-md py-6 px-12 text-base">
			<h2 className="mb-2 text-lg font-medium">Welcome Back!</h2>
			<p className="text-base">Please unlock your account data to continue.</p>
			<Input className="my-2" value={password} onChange={handleInput} onKeyDown={handleEnter} placeholder="Master Password" type="password" autoComplete="password" minLength="1" />
			{warning && <p className="flex items-center text-amber-500 mb-3 animate-pulse"><ExclamationIcon className="w-6 h-6 mr-1" />{warning}</p>}
			<div className="flex gap-2 mt-1">
				<button className="w-full px-3 py-2 text-sm font-medium rounded-md border transition-all text-zinc-200 bg-zinc-900 border-zinc-800 hover:text-zinc-50 hover:bg-zinc-700 hover:border-zinc-900 hover:scale-105 focus-visible:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500" tabIndex="1" onClick={resetData}>Reset Data</button>
				<button className="w-full px-3 py-2 text-sm font-medium rounded-md border transition-all text-zinc-900 bg-zinc-100 border-zinc-300 hover:bg-zinc-300 hover:border-zinc-400 hover:scale-105 focus-visible:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500" tabIndex="0" onClick={login}>Unlock</button>
			</div>
		</div>
}
