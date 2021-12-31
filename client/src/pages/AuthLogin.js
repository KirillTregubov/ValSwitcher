import React, { useState } from 'react';
import { ExclamationIcon } from '@heroicons/react/solid';

export default function AuthLogin({ setLogin, resetData }) {
	const [password, setPassword] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [warning, setWarning] = useState(null);

	const login = (e) => {
		if (!isValid) {
			setWarning('Password cannot be empty.');
			return;
		}
		setWarning('');

		// 'Mypassword1'
		const response = window.app.emitSync('authenticate-login', {
			password: password
		});

		if (response === false) {
			setWarning('Password is invalid.');
		} else {
			setLogin(response);
		}
	}

	const handleInput = (e) => {
		console.log('yo')
		if (e.target.value.length > 0) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
		setPassword(e.target.value);
	}

	return <div className="w-full py-6 px-12 text-base">
		<h2 className="mb-2 text-lg font-medium">Welcome Back!</h2>
		<p className="text-base">Please unlock your account data to continue.</p>
		<input className="w-full p-2 my-2 rounded-md placeholder-zinc-400 text-zinc-200 bg-zinc-600 border shadow-sm border-zinc-700 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 transition-all" placeholder="Master Password" minLength="1" autoComplete="password" type="password" value={password} onChange={handleInput}></input>
		{ warning && <p className="flex items-center text-amber-500 -mt-1 mb-3 animate-pulse"><ExclamationIcon className="w-6 h-6 mr-1" /> {warning}</p> }
		<div className="flex gap-2 mt-1">
			<button className="w-full px-3 py-2 text-sm font-medium rounded-md border transition-all text-zinc-200 bg-zinc-900 border-zinc-800 hover:text-zinc-50 hover:bg-zinc-700 hover:border-zinc-900 hover:scale-105 focus-visible:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500" tabIndex="1" onClick={resetData}>Reset Data</button>
			<button className="w-full px-3 py-2 text-sm font-medium rounded-md border transition-all text-zinc-900 bg-zinc-100 border-zinc-300 hover:bg-zinc-300 hover:border-zinc-400 hover:scale-105 focus-visible:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500" tabIndex="0" onClick={login}>Unlock</button>
		</div>
	</div>
};
