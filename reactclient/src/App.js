import React, { useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
// import { createContainer } from "react-tracked";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import AuthLogin from './pages/AuthLogin';
import AuthRegister from './pages/AuthRegister';
import Authenticated from './pages/Authenticated';
import Main from './pages/Main';
import Account from './pages/Account';
import NewAccount from './pages/NewAccount';
import Navbar from './components/Navbar';
// import AppDump from './pages/AppDump';
import './App.css'

const AuthenticationContext = React.createContext(false);
const AuthenticationUpdaterContext = React.createContext();

function App() {
	let location = useLocation();
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	// const initialState = {
	// 	isAuthenticated: false
	// };

	// const useValue = () => useReducer(
	// 	(state, newValue) => ({ ...state, ...newValue }),
	// 	initialState
	// );

	// const { Provider, useTracked } = createContainer(useValue);

	// useEffect(() => {
	// 	if (!isAuthenticated) {
	// 		const response = window.app.emitSync('authenticate');
	// 		setIsAuthenticated(response);
	// 	}
	// }, [location, isAuthenticated]);

	return (
		<div className="react-app text-white h-screen">
			<AuthenticationContext.Provider value={isAuthenticated}>
				<AuthenticationUpdaterContext.Provider value={setIsAuthenticated}>
					<Navbar />
					<div className="h-full pt-20 pb-10 flex flex-col justify-center items-center">
						<Routes location={location}>
							<Route path="register" element={<AuthRegister />} />
							<Route path="login" element={<AuthLogin />} />
							<Route path="/" element={<Authenticated />}>
								<Route index element={<Main />} />
								<Route path="new-account" element={<NewAccount />} />
								<Route path="u/:accountid" element={<Account />} />
							</Route>
						</Routes>
						{/* {location.state?.backgroundLocation && (
						<Routes>
							<Route path="/new-account" element={<NewAccount />} />
							<Route path="/:accountid" element={<Account />} />
						</Routes>
					)} */}
					</div>
					<div className="fixed bottom-0 left-0 w-full flex justify-center items-center h-10 text-xs text-zinc-500">
						<p>Riot Games, VALORANT, and any associated logos are trademarks, service marks, and/or registered trademarks of Riot Games, Inc.</p>
					</div>
					{/* <button className="inline-block bg-valbeige text-valblack font-bold p-2 rounded">Test Cookies</button>
				<button className="inline-block bg-valbeige text-valblack font-bold p-2 rounded">Test Cookies</button> */}
					{/* <AppDump /> */}
				</AuthenticationUpdaterContext.Provider>
			</AuthenticationContext.Provider>
		</div>
	);
}

function useAuthenticationState() {
	const authenticationState = React.useContext(AuthenticationContext)
	if (typeof authenticationState === 'undefined') {
		throw new Error('useCountState must be used within a CountProvider')
	}
	return authenticationState
}

function useAuthenticationUpdater() {
	const setAuthentication = React.useContext(AuthenticationUpdaterContext)
	if (typeof setAuthentication === 'undefined') {
		throw new Error('useCountUpdater must be used within a CountProvider')
	}
	const authenticationStatus = React.useCallback((status) => setAuthentication(status), [setAuthentication])
	return authenticationStatus
}

function useAuthentication() {
	return [useAuthenticationState(), useAuthenticationUpdater()]
}

export { App, useAuthentication };