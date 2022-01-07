import React from 'react';
import { Transition as HeroTransition } from '@headlessui/react';

export function Transition({ show, ...props }) {
	return <HeroTransition
		show={show}
		appear={true}
		enter="transition-opacity duration-700"
		enterFrom="opacity-0"
		enterTo="opacity-100"
		leave="transition-opacity duration-700"
		leaveFrom="opacity-100"
		leaveTo="opacity-0"
	>
		{props.children}
	</HeroTransition>
}

export function BlurTransition({ show, ...props }) {
	return <HeroTransition
		show={show}
		appear={true}
		enter="transition-all duration-700"
		enterFrom="opacity-0"
		enterTo="opacity-100"
		leave="transition-all duration-700"
		leaveFrom="opacity-100"
		leaveTo="opacity-0"
	>
		{props.children}
	</HeroTransition>
}
