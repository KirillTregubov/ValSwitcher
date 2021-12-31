// import React, { useEffect, useState } from 'react';
import { Transition as HeroTransition } from '@headlessui/react';

export default function Transition({ show, ...props }) {
	// const [isShowing, setIsShowing] = useState(false)
	// useEffect(() => {
	// 	setIsShowing(show);
	// }, [show]);

	return (
		<>
			{/* <button onClick={() => setIsShowing((isShowing) => !isShowing)}>
				Toggle
			</button> */}
			<HeroTransition
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
		</>
	)
}
