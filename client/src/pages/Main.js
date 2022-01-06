import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AccountList from '../components/AccountList';
import Navbar from '../components/Navbar';
import Transition from '../components/Transition';

export default function Main() {
	let navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(null);

	useEffect(() => {
		if (loading) {
			console.log('executing');

			const authStatus = window.app.emitSync('authenticate');
			console.log('Main.js Authenticated status:', isAuthenticated);
			if (authStatus) {
				setLoading(false);
				setIsAuthenticated(true);
			} else if (authStatus === false) {
				const canRegister = window.app.emitSync('authenticate-can-register');
				if (canRegister) {
					console.log('main -> register');
					navigate('/register');
				} else {
					console.log('main -> login');
					navigate('/login');
				}
			} else {
				console.log('Error: not authenticated.')
			}
		}
	}, [loading, isAuthenticated, navigate]);

	const logout = (e) => {
		const response = window.app.emitSync('authenticate-logout');
		if (response) {
			setIsAuthenticated(false);
			setTimeout(() => {
				const canRegister = window.app.emitSync('authenticate-can-register');
				if (canRegister) {
					console.log('main -> register');
					navigate('/register');
				} else {
					console.log('main -> login');
					navigate('/login');
				}
			}, 500);
		}
	}

	return <Transition show={!loading && isAuthenticated}>
		<Navbar showLogout={true} logoutCallback={logout} />
		<div className="group w-full h-full py-6 px-12">
			<AccountList />
		</div>
	</Transition>
}
