import React from 'react';
// import sagePortrait from '../assets/images/sage.png';
import AccountCard from './AccountCard'

const fakeAccounts = [{username: 'account1', agent: 'Astra'}, {username: 'account2', agent: 'Sova'}]

export default function AccountList() {
	return <div>

		{fakeAccounts.map((account, index) => {
			return (<AccountCard username={account.username} agent={account.agent} key={index} />)
		})}
		
		{/* <img className="-mr-16 w-36" src={sagePortrait} alt="Portrait of sage" /> */}
	</div>
};
