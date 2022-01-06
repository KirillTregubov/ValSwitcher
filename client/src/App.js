import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import AuthLogin from './pages/AuthLogin';
import AuthRegister from './pages/AuthRegister';
import Main from './pages/Main';
import './App.css';
// import AppDump from './pages/AppDump';

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
