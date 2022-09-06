import React from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useAccounts } from '../lib/Account'

import AccountCard from './AccountCard'

const fakeAccounts = [
  { username: 'thespectra23', alias: 'main', agent: 'Chamber' },
  { username: 'thespectra99', alias: 'silver smurf', agent: 'Omen' },
  { username: 'anotherspectra', alias: 'gold smurf', agent: 'Fade' },
  { username: 'joeysaccount', alias: "friend's account", agent: 'Chamber' },
  {
    username: 'joeysrealandaccount',
    alias: 'actualpogchamp',
    agent: 'Neon'
  },
  {
    username: 'joeysaccount',
    alias: "friend's cool awesome account",
    agent: 'Reyna'
  }
]

export default function AccountList() {
  const accounts = useAccounts()

  console.log(accounts)

  return (
    <div className="masked-scroll relative h-full w-full overflow-auto overflow-y-visible py-6 px-12">
      <ScrollContainer
        className="relative flex w-full max-w-full cursor-ew-resize gap-2 pr-6"
        hideScrollbars={false}
      >
        {fakeAccounts.map((account, index) => (
          <AccountCard
            username={account.username}
            alias={account.alias}
            agent={account.agent}
            key={index}
          />
        ))}
      </ScrollContainer>
    </div>
  )
}
