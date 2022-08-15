import React from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'

import AccountCard from './AccountCard'

const fakeAccounts = [
  { username: 'thespectra', alias: 'main', agent: 'Astra' },
  { username: 'imsilver', alias: 'silver smurf', agent: 'Yoru' },
  { username: 'anotherspectra', alias: 'gold smurf', agent: 'Neon' },
  { username: 'joeysaccount', alias: "friend's account", agent: 'Reyna' }
  // { username: 'joeysaccount', alias: 'friend\'s account', agent: 'Reyna' },
  // { username: 'joeysaccount', alias: 'friend\'s account', agent: 'Reyna' }
]

export default function AccountList() {
  return (
    <div className="masked-scroll relative h-full w-full overflow-x-auto py-6 px-12">
      <ScrollContainer
        className={`relative flex w-full max-w-full cursor-ew-resize gap-4 p-1 pr-6 ${
          fakeAccounts.length > 2 ? 'pb-2' : ''
        }`}
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
