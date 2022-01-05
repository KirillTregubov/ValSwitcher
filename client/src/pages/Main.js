import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AccountList from '../components/AccountList';
import Transition from '../components/Transition';

export default function Main() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading) {
			console.log('executing');

			const isAuthenticated = window.app.emitSync('authenticate');
			console.log('Main.js Authenticated status:', isAuthenticated);
			if (isAuthenticated) {
				setLoading(false);
			} else if (isAuthenticated === false) {
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
	}, [loading, navigate]);

	return <Transition show={!loading}>
		<div className="group w-full h-full py-6 px-12">
			<AccountList />
		</div>
	</Transition>
}
