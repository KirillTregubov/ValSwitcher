import React, { useEffect, useState, useRef } from 'react';
import ValorantAgent from './ValorantAgent'
import { XCircleIcon } from '@heroicons/react/solid'

// Currently supported agents:
// const agents = ['Astra', 'Breach', 'Brimstone', 'Chamber', 'Cypher', 'Jett', 'KAYO', 'Killjoy', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Skye', 'Sova', 'Viper', 'Yoru' ];

export default function AccountCard({ username, alias, agent }) {
	const [loading, setLoading] = useState(true);
	const inputContainer = useRef(null);

	const handleMultiFocus = (e) => {
		// console.log('focus');
		let element = e.target;

		let flag = false;
		while (element.previousElementSibling && element.previousElementSibling.value.length === 0) {
			element = element.previousElementSibling;
			flag = true;
		}
		if (flag) {
			element.focus();
		}
	}

	const handleMultiInput = (e) => {
		// console.log('input');
		let element = e.target;

		if (!Number.isInteger(parseInt(element.value))) {
			element.value = '';
			return;
		}

		if (element.previousElementSibling && element.value.length === 0) {
			element.previousElementSibling.focus();
			element = element.previousElementSibling;
		}
		if (element.nextElementSibling && element.value) {
			element.nextElementSibling.focus();
		}
	}

	const handleMultiKeyDown = (e) => {
		// console.log('keydown');
		const element = e.target;

		// 37 is left
		if (e.keyCode === 37) {
			if (element.previousElementSibling) {
				element.previousElementSibling.focus();
			}
			e.preventDefault();
			return;
		}

		// 39 is right
		if (e.keyCode === 39) {
			if (element.nextElementSibling && element.value) {
				element.nextElementSibling.focus();
				e.preventDefault();
			}
			return;
		}

		// 8 is backspace, 46 is del
		if (e.keyCode === 8 || e.keyCode === 46) {
			let flag = false;
			let targetElement = element;
			while (targetElement.previousElementSibling && targetElement.value.length === 0) {
				targetElement = targetElement.previousElementSibling;
				flag = true;
			}
			if (flag) {
				targetElement.focus();
			}
		}
	}

	const handleMultiPaste = (e) => {
		console.log('paste');

		const data = e.clipboardData.getData('text');

		let i;
		const inputs = Array.from(e.target.parentNode.children);
		for (i = 0; i < inputs.length && i < data.length; i++) {
			if (!Number.isInteger(parseInt(data[i]))) {
				if (i > 0) inputs[i - 1].focus();
				return;
			}
			inputs[i].value = data[i];
		}
		if (i > 0) inputs[i - 1].focus();
	}

	const handleMultiDelete = (e) => {
		const inputs = inputContainer.current;
		Array.from(inputs.children).forEach(input => {
			if (input.value !== '') input.value = '';
		});
		inputs.children[0].focus();
	}

	useEffect(() => {
		if (loading) {
			setLoading(false)
			// setTimeout(() => {}, 3000);
			// setAgent(agents[Math.floor(Math.random() * agents.length)]);
		}
	}, [loading]);

	if (loading) {
		return <div>Loading...</div>
	} else {
		return <div className="flex flex-grow flex-shrink-0 w-[30%] py-6 px-8 select-none rounded-3xl bg-zinc-900 shadow-zinc-700/20 shadow-md border border-zinc-800">
			<div className=''>
				<h2 className="text-md text-zinc-400 font-semibold">Username</h2>
				<h1 className="">{username}</h1>
				<h1 className="uppercase text-zinc-400 font-semibold">{alias}</h1>
			</div>

			<ValorantAgent className="ml-auto w-20" name={agent} />

			{/* <h2 className="inline-block">2fa</h2>
			<form className="flex space-x-2" onSubmit={event => event.preventDefault()}>
				<div className="space-x-2" ref={inputContainer}>
					<input className="w-7 p-2 text-center rounded-sm placeholder-zinc-400 text-zinc-200 bg-zinc-600 border shadow-sm border-zinc-700 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 transition-all" placeholder="-" minLength="1" maxLength="1" inputMode="numeric" pattern="[0-9]" autoComplete="new-password" type="text" onPaste={handleMultiPaste} onChange={handleMultiInput} onKeyDown={handleMultiKeyDown} onFocus={handleMultiFocus}></input>
					<input className="w-7 p-2 text-center rounded-sm placeholder-slate-400 text-slate-200 bg-zinc-600 border shadow-sm border-zinc-700 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 transition-all" placeholder="-" minLength="1" maxLength="1" inputMode="numeric" pattern="[0-9]" autoComplete="new-password" type="text" onPaste={handleMultiPaste} onChange={handleMultiInput} onKeyDown={handleMultiKeyDown} onFocus={handleMultiFocus}></input>
					<input className="w-7 p-2 text-center rounded-sm placeholder-slate-400 text-slate-200 bg-zinc-600 border shadow-sm border-zinc-700 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 transition-all" placeholder="-" minLength="1" maxLength="1" inputMode="numeric" pattern="[0-9]" autoComplete="new-password" type="text" onPaste={handleMultiPaste} onChange={handleMultiInput} onKeyDown={handleMultiKeyDown} onFocus={handleMultiFocus}></input>
					<input className="w-7 p-2 text-center rounded-sm placeholder-slate-400 text-slate-200 bg-zinc-600 border shadow-sm border-zinc-700 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 transition-all" placeholder="-" minLength="1" maxLength="1" inputMode="numeric" pattern="[0-9]" autoComplete="new-password" type="text" onPaste={handleMultiPaste} onChange={handleMultiInput} onKeyDown={handleMultiKeyDown} onFocus={handleMultiFocus}></input>
					<input className="w-7 p-2 text-center rounded-sm placeholder-slate-400 text-slate-200 bg-zinc-600 border shadow-sm border-zinc-700 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 transition-all" placeholder="-" minLength="1" maxLength="1" inputMode="numeric" pattern="[0-9]" autoComplete="new-password" type="text" onPaste={handleMultiPaste} onChange={handleMultiInput} onKeyDown={handleMultiKeyDown} onFocus={handleMultiFocus}></input>
					<input className="w-7 p-2 text-center rounded-sm placeholder-slate-400 text-slate-200 bg-zinc-600 border shadow-sm border-zinc-700 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 transition-all" placeholder="-" minLength="1" maxLength="1" inputMode="numeric" pattern="[0-9]" autoComplete="new-password" type="text" onPaste={handleMultiPaste} onChange={handleMultiInput} onKeyDown={handleMultiKeyDown} onFocus={handleMultiFocus}></input>
				</div>

				<button onClick={handleMultiDelete}><XCircleIcon className="h-5 w-5 text-valbeige" /></button>
			</form> */}

			{/* { agents.map((agent, index) => 
				<img key={index} className="-mr-16 w-36" src={`./images/${agent}.png`} alt="Portrait of sage" />
			)} */}
		</div>
	}
};
