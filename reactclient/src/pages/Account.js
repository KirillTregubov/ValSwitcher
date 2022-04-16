import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import FocusTrap from 'focus-trap-react';
import { XIcon } from '@heroicons/react/solid';
import { Transition } from '../components/Transition';
import { navigateWithDelay } from '../util';

export default function NewAccount() {
	let [showing, setShowing] = useState(true);
	let navigate = useNavigate();
	const accountId = useParams().accountid;

	function close() {
		setShowing(false);
		navigateWithDelay('/', navigate);
	}

	return <Transition show={showing}>
		<div>
			<div className="absolute z-10 inset-0 flex justify-center items-center">
				<div className="relative flex max-w-md w-full flex-col bg-valred pt-10">

					<div>Account: {accountId}</div>
					<button >Cool button</button>

					<div className="absolute top-0 right-0 h-10 flex items-center p-2 px-3">
						<button className="outline-none focus-visible:ring-2 ring-slate-600 rounded-sm" onClick={close}><XIcon className="h-5" /></button>
					</div>
				</div>
			</div>
		</div>
	</Transition>
}
