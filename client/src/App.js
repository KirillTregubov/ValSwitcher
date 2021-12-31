// import AppDump from './pages/AppDump';
import { useEffect, useState } from 'react';
import AuthLogin from './pages/AuthLogin';
import AuthRegister from './pages/AuthRegister';
import Main from './pages/Main';
import Transition from './components/Transition';
import './App.css';
import logo from './assets/images/ValorantLogo.svg';

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	// const [isRegistered, setIsRegistered] = useState(null);

	const [showLogin, setShowLogin] = useState(false);
	const [showRegister, setShowRegister] = useState(false);

	useEffect(() => {
		checkAuth();
		// setIsAuthenticated(false);
		// setIsRegistered(true);
		// setShowLogin(true);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const checkAuth = () => {
		const response = window.app.emitSync('authenticate');
		setIsAuthenticated(response);

		if (response === false) {
			checkAuthRegister();
			setShowLogin(true);
		}
	}

	const checkAuthRegister = () => {
		console.log('checking register');
		// TODO: Make method that checks if need to register
		// const response = window.app.emitSync('authenticate-can-register');
	}

	const logout = (e) => {
		// TODO: implement logout
		setIsAuthenticated(false);
	}

	const resetData = async (e) => {
		// TODO: Trigger confirmation
		// TODO: Make method that resets data

		setShowLogin(false);
		setTimeout(() => { setShowRegister(true); }, 800);
	}

	return (
		<div className="App text-white h-screen">
			<div className="fixed top-0 left-0 z-10 flex justify-center items-center w-full h-20 px-12 bg-valblack-dark">
				<div className="flex-1"></div>
				<div className="flex items-center space-x-2">
					<img className="block w-44" src={logo} alt="Valorant" />
					<h1 className="text-2xl pt-title font-valorant text-valbeige leading-none">Switcher</h1>
				</div>
				<div className="flex-1 flex justify-end">
					{isAuthenticated === true
						? <button className="px-3 py-2 text-sm font-medium rounded-md border text-zinc-200 bg-zinc-800 border-zinc-900 hover:text-zinc-50 hover:bg-zinc-700 hover:border-zinc-800" onClick={logout}>Logout</button>
						: <div></div>
					}
				</div>
			</div>
			<div className="h-full pt-20 pb-10 flex flex-col justify-center items-center">
				{isAuthenticated == null
					? <div>Loading...</div>
					: isAuthenticated
						? <Main />
						: <>
							{/* isRegistered ? */}
							<Transition show={showLogin}>
								<AuthLogin setLogin={setIsAuthenticated} resetData={resetData} />
							</Transition>
							<Transition show={showRegister}>
								<AuthRegister />
							</Transition></>
					// : isRegistered
					// 	? 
				}
				{/*  */}
				{/* <Main /> */}
			</div>
			<div className="fixed bottom-0 left-0 w-full flex justify-center items-center h-10 text-xs text-zinc-600">
				<p>Riot Games, VALORANT, and any associated logos are trademarks, service marks, and/or registered trademarks of Riot Games, Inc.</p>
			</div>
			{/* onClick={testCookies()} */}
			{/* <button className="inline-block bg-valbeige text-valblack font-bold p-2 rounded">Test Cookies</button>
			<button className="inline-block bg-valbeige text-valblack font-bold p-2 rounded">Test Cookies</button> */}
			{/* <AppDump /> */}
		</div>
	);
}

export default App;
