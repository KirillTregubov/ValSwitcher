import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AuthLogin from './pages/AuthLogin';
import AuthRegister from './pages/AuthRegister';
import Main from './pages/Main';
import NewAccount from './pages/NewAccount';
import Navbar from './components/Navbar';
import './App.css';
// import AppDump from './pages/AppDump';

import { Dialog } from '@headlessui/react'
function MyDialog() {
	let navigate = useNavigate();
	let [isOpen, setIsOpen] = useState(true)

	function close() {
		setIsOpen(false);

		navigate('/');
	}

	return (
		<Dialog initialFocus={null} open={isOpen} onClose={close} className="fixed z-10 inset-0 overflow-y-auto text-white">
			<Dialog.Overlay className="fixed inset-0" />

			<Dialog.Title>Deactivate account</Dialog.Title>
			<Dialog.Description>
				This will permanently deactivate your account
			</Dialog.Description>

			<p>
				Are you sure you want to deactivate your account? All of your data will
				be permanently removed. This action cannot be undone.
			</p>

			<button onClick={close}>Deactivate</button>
			<button onClick={close}>Cancel</button>
		</Dialog>
	)
}

export default function App() {
	let location = useLocation();
	const [isAuthenticated, setIsAuthenticated] = useState(null);

	useEffect(() => {
		if (!isAuthenticated) {
			const response = window.app.emitSync('authenticate');
			setIsAuthenticated(response);
		}
	}, [location, isAuthenticated]);

	return (
		<div className="App text-white h-screen">
			<Navbar />
			<div className="h-full pt-20 pb-10 flex flex-col justify-center items-center">
				<Routes location={location.state?.backgroundLocation || location}>
					<Route path="/">
						<Route index element={<Main />} />
						<Route path="register" element={<AuthRegister />} />
						<Route path="login" element={<AuthLogin />} />
					</Route>
				</Routes>
				{location.state?.backgroundLocation && (
					<Routes>
						<Route path="/new-account" element={<MyDialog />} />
						<Route path="/:accountid" element={<NewAccount />} />
					</Routes>
				)}
			</div>
			<div className="fixed bottom-0 left-0 w-full flex justify-center items-center h-10 text-xs text-zinc-600">
				<p>Riot Games, VALORANT, and any associated logos are trademarks, service marks, and/or registered trademarks of Riot Games, Inc.</p>
			</div>
			{/* <button className="inline-block bg-valbeige text-valblack font-bold p-2 rounded">Test Cookies</button>
			<button className="inline-block bg-valbeige text-valblack font-bold p-2 rounded">Test Cookies</button> */}
			{/* <AppDump /> */}
		</div>
	);
}


