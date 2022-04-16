import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { LogoutIcon } from '@heroicons/react/outline';
import { Transition } from '../components/Transition';
import { useAuthentication } from '../App.js';
import { navigateWithDelay } from '../util';

export default function Authenticated() {
	let location = useLocation();
	let navigate = useNavigate();
	const [state, setState] = useAuthentication();
	// const [state, setState] = useTracked();
	// const [loading, setLoading] = useState(true);
	// const [isAuthenticated, setIsAuthenticated] = useState(null);

	// useEffect(() => {
	// 	console.log('state: ', state)
	// }, [state])

	useEffect(() => {
		if (!state.isAuthenticated) {
			console.log('not authed')

			const authStatus = window.app.emitSync('authenticate');
			if (authStatus) {
				setState({isAuthenticated: true})
			} else if (authStatus === false) {
				const canRegister = window.app.emitSync('authenticate-can-register');
				if (canRegister) {
					console.log('main -> register');
					navigateWithDelay('/register', navigate);
				} else {
					console.log('main -> login');
					navigateWithDelay('/login', navigate);
				}
			} else {
				console.log('Error: not authenticated.')
			}
		}
	}, [state.isAuthenticated, navigate, setState]);

	// useEffect(() => {
	// 	if (loading || !isAuthenticated) {
	// 		console.log('executing');

	// 		const authStatus = window.app.emitSync('authenticate');
	// 		console.log('Main.js Authenticated status:', authStatus);
	// 		if (authStatus) {
	// 			setLoading(false);
	// 			setIsAuthenticated(true);
	// 		} else if (authStatus === false) {
	// 			const canRegister = window.app.emitSync('authenticate-can-register');
	// 			if (canRegister) {
	// 				console.log('main -> register');
	// 				navigateWithDelay('/register', navigate);
	// 			} else {
	// 				console.log('main -> login');
	// 				navigateWithDelay('/login', navigate);
	// 			}
	// 		} else {
	// 			console.log('Error: not authenticated.')
	// 		}
	// 	}
	// }, [loading, isAuthenticated, navigate]);


	// const logout = (e) => {
	// 	console.log('logout')
	// 	const response = window.app.emitSync('authenticate-logout');
	// 	if (response) {
	// 		setIsAuthenticated(false);
	// 	}
	// }

	return <Transition show={true}>
		<Outlet />
		{/* <div className="fixed top-0 right-0 flex items-center h-20 px-12 select-none">
			{/* border-2 shadow bg-zinc-900 border-zinc-800 hover:border-zinc-600 focus-visible:border-zinc-600
			<button className="flex h-min items-center px-3 py-2 text-sm font-medium rounded-full outline-none transition-all text-zinc-400 ring-zinc-700 hover:text-zinc-50 hover:bg-zinc-900 focus-visible:text-zinc-50 focus-visible:bg-zinc-900 focus:ring-2" onClick={logout}>
				Logout <LogoutIcon className="h-4 ml-1" />
			</button>
		</div>*/}
	</Transition>
}
