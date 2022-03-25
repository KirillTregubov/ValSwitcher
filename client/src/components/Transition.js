import React from 'react';
import { Transition as HeadlessTransition } from '@headlessui/react';

export function Transition({ show, ...props }) {
	return <HeadlessTransition show={show}
		appear={true}
		enter="transition duration-700"
		enterFrom="opacity-0"
		enterTo="opacity-100"
		leave="transition duration-700"
		leaveFrom="opacity-100"
		leaveTo="opacity-0"
	>
		{props.children}
	</HeadlessTransition>
}

export function BlurTransition({ show, ...props }) {
	return <HeadlessTransition
		show={show}
		appear={true}
		enter="transition duration-700"
		enterFrom="opacity-0"
		enterTo="opacity-100"
		leave="transition duration-700"
		leaveFrom="opacity-100"
		leaveTo="opacity-0"
	>
		{props.children}
	</HeadlessTransition>
}
