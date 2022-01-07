import React from 'react';
// import { Link } from 'react-router-dom';
import { Transition } from './Transition';
import logo from '../assets/images/ValorantLogo.svg';

export default function Navbar() {
	return <Transition show={true}>
		<div className="fixed top-0 left-0 z-0 flex justify-center items-center w-full h-20 px-12 select-none">
			{/* <Link to="/"> */}
			<div className="flex items-center space-x-2">
				<img className="block w-44" src={logo} alt="Valorant" />
				<h1 className="text-2xl pt-title font-valorant text-valbeige leading-none">Switcher</h1>
			</div>
			{/* </Link> */}
		</div>
	</Transition>
}
