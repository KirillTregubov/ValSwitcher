import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FocusTrap from 'focus-trap-react';
import { XIcon } from '@heroicons/react/solid';
import { Transition } from '../components/Transition';

export default function NewAccount() {
	let navigate = useNavigate();
	const accountId = useParams().accountid;

	function close(e) {
		navigate(-1);
	}

	return <FocusTrap>
		<div>
			<Transition show={true}>
			<div className="absolute z-10 inset-0 flex justify-center items-center bg-slate-900/20">
				<div className="relative flex max-w-md w-full flex-col bg-valred pt-10">
					
					Dialog
					<div>{accountId}</div>
					<button autoFocus={true}>Cool button</button>
					
					<div className="absolute top-0 right-0 h-10 flex items-center p-2 px-3">
						<button className="outline-none focus-visible:ring-2 ring-slate-600 rounded-sm" onClick={close}><XIcon className="h-5" /></button>
					</div>
				</div>
			</div>
			</Transition>
			</div>
		</FocusTrap>
	
}
