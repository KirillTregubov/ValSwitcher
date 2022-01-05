import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import AuthLogin from './pages/AuthLogin';
import AuthRegister from './pages/AuthRegister';
import Main from './pages/Main';
import './App.css';
import logo from './assets/images/ValorantLogo.svg';
import { LogoutIcon } from '@heroicons/react/outline';
// import AppDump from './pages/AppDump';

export default function App() {
	let location = useLocation();
	const [isAuthenticated, setIsAuthenticated] = useState(null);

	useEffect(() => {
		const response = window.app.emitSync('authenticate');
		setIsAuthenticated(response);
	}, [location]);

	// TODO: Fix header logout
	const logout = (e) => {
		const response = window.app.emitSync('authenticate-logout');
		if (response) setIsAuthenticated(false);
	}

	return (
		<div className="App text-white h-screen">
			<div className="fixed top-0 left-0 z-10 flex justify-center items-center w-full h-20 px-12 bg-valblack-dark select-none">
				<div className="flex-1"></div>
				<div className="flex items-center space-x-2">
					<img className="block w-44" src={logo} alt="Valorant" />
					<h1 className="text-2xl pt-title font-valorant text-valbeige leading-none">Switcher</h1>
				</div>
				<div className="flex-1 flex justify-end">
					{isAuthenticated === true
						? (<button className="flex items-center px-3 py-2 text-sm font-medium rounded-md border-2 shadow text-zinc-200 bg-zinc-800 border-zinc-700 hover:text-zinc-50 hover:bg-zinc-700 hover:border-zinc-600 focus-visible:text-zinc-50 focus-visible:bg-zinc-700 focus-visible:border-zinc-600 focus:outline-none focus:ring ring-zinc-600" onClick={logout}>
							<LogoutIcon className="h-4 mr-1" /> Logout
						</button>)
						: <div></div>
					}
				</div>
			</div>
			<div className="h-full pt-20 pb-10 flex flex-col justify-center items-center">
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/register" element={<AuthRegister />} />
						<Route path="/login" element={<AuthLogin />} />
					</Routes>
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
