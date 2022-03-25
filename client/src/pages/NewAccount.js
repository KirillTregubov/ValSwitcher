import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Dialog } from '@headlessui/react';

export default function Account() {
	let navigate = useNavigate();
	let [isOpen, setIsOpen] = useState(true)

	function close() {
		setIsOpen(false);

		navigate('/');
	}

	return (
		<Dialog initialFocus={null} open={isOpen} onClose={close} className="fixed z-10 inset-0 overflow-y-auto text-white">
			<Dialog.Overlay className="fixed inset-0" />

			<Dialog.Title>Deactivate account</Dialog.Title>
			<Dialog.Description>
				This will permanently deactivate your account
			</Dialog.Description>

			<p>
				Are you sure you want to deactivate your account? All of your data will
				be permanently removed. This action cannot be undone.
			</p>

			<button onClick={close}>Deactivate</button>
			<button onClick={close}>Cancel</button>
		</Dialog>
	)
}