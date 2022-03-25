import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import FocusTrap from 'focus-trap-react';
import { XIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';
import { Dialog } from '@headlessui/react';
import { navigateWithSmallDelay } from '../util';

export default function NewAccount() {
	let [showing, setShowing] = useState(true);
	let navigate = useNavigate();
	const accountId = useParams().accountid;

	function close(e) {
		setShowing(false);
		navigateWithSmallDelay(-1, navigate);
	}

	return (
		<Transition.Root show={showing} appear={true}>
		{/* <HeadlessTransition
			show={showing}
			appear={true}
			as={React.Fragment}
			enter="transition duration-700"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition duration-700"
			leaveFrom="bg-blue-600 opacity-100"
			leaveTo="opacity-0"
		> */}

			{/* <div>
				Hello Friend!
				<button className="outline-none focus-visible:ring-2 ring-slate-600 rounded-sm" onClick={close}><XIcon className="h-5" /></button>
			</div> */}
			<Dialog onClose={close}>
			<Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
				<div className="absolute z-10 inset-0 flex justify-center items-center bg-slate-900/20">
					<div className="relative flex max-w-md w-full flex-col bg-valred pt-10">

						<div>Account: {accountId}</div>
						<button autoFocus={true}>Cool button</button>

						<div className="absolute top-0 right-0 h-10 flex items-center p-2 px-3">
							<button className="outline-none focus-visible:ring-2 ring-slate-600 rounded-sm" onClick={close}><XIcon className="h-5" /></button>
						</div>
					</div>
				</div>
				</Transition.Child>
			</Dialog>
		{/* {</HeadlessTransition>} */}
		</Transition.Root>
	)
}
