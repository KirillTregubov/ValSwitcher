import React, { useEffect, useState } from 'react';
import logo from '../logo.svg';
import Account from '../components/Account';

export default function AppDump({ username, className, ...props }) {
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const [registerStatus, setRegisterStatus] = useState(null);
	const [loading, setLoading] = useState(null);
	const [accounts, setAccounts] = useState(null);
	const password = 'Mypassword1';
	// const password = 'Coolpassword';

	useEffect(() => {
		setLoading(true);
		checkAuth();
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			if (!Array.isArray(accounts)) {
				console.log('getting accounts')
				setAccounts(window.app.emitSync('get-accounts'));
				setLoading(false);
			}
			return;
		}
		if (loading) setLoading(false);

	}, [loading, isAuthenticated, accounts]);

	function checkAuth() {
		setIsAuthenticated(window.app.emitSync('authenticate'));
	}

	function register() {
		const response = window.app.emitSync('authenticate-register', {
			password: password,
			// newPassword: 'Coolpassword'
		});
		if (response) {
			setRegisterStatus(true);
			setIsAuthenticated(true);
		}
		else setRegisterStatus(false);
	}

	function login() {
		setIsAuthenticated(window.app.emitSync('authenticate-login', {
			password: password
		}));
	}

	function addAccount() {
		window.app.emit('add-account', {
			username: 'leakedusername1',
			password: 'Leakedpassword!'
		});
		setAccounts(window.app.emitSync('get-accounts'));
	}

	return <header className="text-white">
		<button onClick={register}>
			Register
		</button>
		<button onClick={login}>
			Login
		</button>

		<div className='text-lg'>
			{registerStatus
				? <div className="text-green-500">Success</div>
				: registerStatus == null
					? <div className="">None</div>
					: <div className="text-red-500">Fail</div>
			}
		</div>

		<div className='text-lg'>
			{isAuthenticated
				? <div className="text-green-500">Authenticated!!</div>
				: <div className="text-red-500">Not authed :(</div>
			}
		</div>
		<img src={logo} className="App-logo h-32 w-32" alt="logo" />
		<p>
			Edit <code>src/App.js</code> and save to reload.
		</p>
		<button onClick={addAccount}>
			Add Account
		</button>

		{loading
			? <div>Loading...</div>
			: accounts && Array.isArray(accounts)
				? accounts.map(function (account, id) {
					return <Account key={id} username={account.username} />
				})
				: <div>Logged out</div>
		}

	</header>
}