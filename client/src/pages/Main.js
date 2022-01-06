import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { LogoutIcon } from '@heroicons/react/outline';
import AccountList from '../components/AccountList';
import Transition from '../components/Transition';
import { navigateWithDelay } from '../util';

export default function Main() {
	let navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(null);

	useEffect(() => {
		if (loading || !isAuthenticated) {
			console.log('executing');

			const authStatus = window.app.emitSync('authenticate');
			console.log('Main.js Authenticated status:', authStatus);
			if (authStatus) {
				setLoading(false);
				setIsAuthenticated(true);
			} else if (authStatus === false) {
				const canRegister = window.app.emitSync('authenticate-can-register');
				if (canRegister) {
					console.log('main -> register');
					navigateWithDelay('register', navigate);
				} else {
					console.log('main -> login');
					navigateWithDelay('login', navigate);
				}
			} else {
				console.log('Error: not authenticated.')
			}
		}
	}, [loading, isAuthenticated, navigate]);

	const logout = (e) => {
		console.log('logout')
		const response = window.app.emitSync('authenticate-logout');
		if (response) {
			setIsAuthenticated(false);
		}
	}

	return <Transition show={!loading && isAuthenticated}>
		<AccountList />
		<div className="fixed top-0 right-0 flex items-center h-20 px-12 select-none">
			{/* border-2 shadow bg-zinc-900 border-zinc-800 hover:border-zinc-600 focus-visible:border-zinc-600  */}
			<button className="flex h-min items-center px-3 py-2 text-sm font-medium rounded-full outline-none transition-all text-zinc-400 ring-zinc-700 hover:text-zinc-50 hover:bg-zinc-900 focus-visible:text-zinc-50 focus-visible:bg-zinc-900 focus:ring-2" onClick={logout}>
				Logout <LogoutIcon className="h-4 ml-1" />
			</button>
		</div>
	</Transition>
}
