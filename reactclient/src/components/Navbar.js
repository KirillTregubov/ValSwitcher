import React from 'react';
// import { Link } from 'react-router-dom';
// import { Transition } from './Transition';
import { LogoutIcon } from '@heroicons/react/outline';
import Logo from '../assets/images/ValorantLogo.svg';
import { useAuthentication } from '../App.js';

export default function Navbar() {
	const [state, setState] = useAuthentication();

	const logout = (e) => {
		console.log('logout')
		const response = window.app.emitSync('authenticate-logout');
		if (response) {
			console.log(response)
			setState(true)
			// setIsAuthenticated(false);
		}
	}

	return <div className="fixed top-0 left-0 z-0 flex items-center w-full h-20 px-12 select-none">
		<div className="flex-1"></div>
		<div className="grow justify-center flex items-center space-x-2">
			<img className="block w-44" src={Logo} alt="Valorant" />
			<h1 className="text-[1.55rem] pt-[6px] font-valorant text-valbeige leading-none">Switcher</h1>
		</div>
		<div className="flex-1 flex justify-end">
			<button className="flex items-center px-3 py-2 text-sm font-medium rounded-full outline-none transition-all text-zinc-400 ring-zinc-700 hover:text-zinc-50 hover:bg-zinc-900 focus-visible:text-zinc-50 focus-visible:bg-zinc-900 focus:ring-2" onClick={logout}>
				Logout <LogoutIcon className="h-4 ml-1" />
			</button>
		</div>
	</div>
	// <Transition show={true}>
	// </Transition>
}
