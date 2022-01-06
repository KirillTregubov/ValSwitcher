import React from 'react';
import { LogoutIcon } from '@heroicons/react/outline';
import logo from '../assets/images/ValorantLogo.svg';

export default function Navbar({ showLogout, logoutCallback, ...props }) {
	return <div className="fixed top-0 left-0 z-10 flex justify-center items-center w-full h-20 px-12 bg-valblack-dark select-none">
		<div className="flex-1"></div>
		<div className="flex items-center space-x-2">
			<img className="block w-44" src={logo} alt="Valorant" />
			<h1 className="text-2xl pt-title font-valorant text-valbeige leading-none">Switcher</h1>
		</div>
		{showLogout
			? <div className="flex-1 flex justify-end">
			<button className="flex items-center px-3 py-2 text-sm font-medium rounded-md border-2 shadow text-zinc-200 bg-zinc-800 border-zinc-700 hover:text-zinc-50 hover:bg-zinc-700 hover:border-zinc-600 focus-visible:text-zinc-50 focus-visible:bg-zinc-700 focus-visible:border-zinc-600 focus:outline-none focus:ring ring-zinc-600" onClick={logoutCallback}>
				<LogoutIcon className="h-4 mr-1" /> Logout
			</button>
		</div>
			: <div className="flex-1"></div>
		}
		
	</div>
}
