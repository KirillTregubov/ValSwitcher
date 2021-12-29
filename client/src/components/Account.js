import React, { useState } from 'react';

export default function Account({ username, className, ...props }) {
	const [mfaRequested, setMfaRequested] = useState(false);
	const [mfaValue, setMfaValue] = useState('');

	function handleMfa(event) {
		setMfaValue(event.target.value);
	}

	function submitMfa() {
		if (mfaValue.length !== 6 || isNaN(mfaValue)) {
			console.log('MFA Error');
			return;
		}

		console.log(mfaValue);
		window.app.emit('send-mfa', {
			username: username,
			mfaCode: mfaValue
		});
	}

	function initDownload() {
		console.log('Init download');
		window.app.listen('mfa-request', handleMfaRequest);

		const response = window.app.emitSync('download-profile', {
			username: username
		});
		console.log(response);
	}

	function handleMfaRequest(args) {
		setMfaRequested(true);
	}

	if (className == null) className = '';
	if (username == null) {
		return <div>Error</div>;
	}
	return <div className={`p-4 rounded-md bg-slate-600 ${className}`} {...props}>
		<h1>Username: {username}</h1>
		<button onClick={initDownload}>Download Profile</button>

		{mfaRequested && <div>
			MFA Handler
			<input className="text-black" type="text" value={mfaValue} onChange={handleMfa} />
			<button onClick={submitMfa}>Submit MFA</button>
		</div>}
	</div>
}