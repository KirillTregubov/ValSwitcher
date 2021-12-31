import React from 'react';
import AccountCard from './AccountCard'

const fakeAccounts = [{username: 'thespectra', alias:'main', agent: 'Astra'}, {username: 'imsilver', alias:'silver smurf', agent: 'Yoru'}, {username: 'anotherspectra', alias:'gold smurf', agent: 'Sova'}, {username: 'joeysaccount', alias:'friend\'s account', agent: 'Reyna'}, {username: 'joeysaccount', alias:'friend\'s account', agent: 'Reyna'}, {username: 'joeysaccount', alias:'friend\'s account', agent: 'Reyna'}]

export default function AccountList() {
	return <div className="flex gap-4 pb-3 overflow-x-scroll">
		{fakeAccounts.map((account, index) => 
			<AccountCard username={account.username} alias={account.alias} agent={account.agent} key={index} />
		)}
	</div>
};
