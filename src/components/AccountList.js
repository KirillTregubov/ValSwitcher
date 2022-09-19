import React from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { useAccounts } from '../lib/Account'

import AccountCard from './AccountCard'
import Button from './Button'
import ValorantAgent from './ValorantAgent'

// const fakeAccounts = [
//   { username: 'thespectra23', alias: 'main', agent: 'Chamber' },
//   { username: 'thespectra99', alias: 'silver smurf', agent: 'Omen' },
//   { username: 'anotherspectra', alias: 'gold smurf', agent: 'Fade' },
//   { username: 'joeysaccount', alias: "friend's account", agent: 'Chamber' },
//   {
//     username: 'joeysrealandaccount',
//     alias: 'actualpogchamp',
//     agent: 'Neon'
//   },
//   {
//     username: 'joeysaccount',
//     alias: "friend's cool awesome account",
//     agent: 'Reyna'
//   }
// ]

export default function AccountList() {
  const accounts = useAccounts()

  console.log(accounts)

  if (Array.isArray(accounts)) {
    if (accounts.length > 0) {
      return (
        <div
          className={`${
            accounts.length > 3 ? 'masked-scroll' : ''
          } relative h-full w-full overflow-auto overflow-y-visible py-6 px-12`}
        >
          <ScrollContainer
            className={`${
              accounts.length > 3 ? 'cursor-ew-resize pr-6' : 'justify-center'
            } relative mx-auto flex w-full max-w-full gap-2`}
            hideScrollbars={false}
          >
            {accounts.map((account, index) => (
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
    } else {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex">
            <ValorantAgent
              className="w-20 object-contain object-right transition-transform will-change-transform group-hover:scale-[115%] group-focus-visible:scale-[115%]"
              name={'Breach'}
            />
            <ValorantAgent
              className="w-20 object-contain object-right transition-transform will-change-transform group-hover:scale-[115%] group-focus-visible:scale-[115%]"
              name={'Viper'}
            />
          </div>
          <h1 className="my-1 text-lg font-bold text-neutral-100">
            You don't have any accounts yet
          </h1>
          <Button isLink to="/new-account" primary>
            Create an Account
          </Button>
        </div>
      )
    }
  }

  return (
    // TODO: Fix loading state
    <div className="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4 shadow">
      <div className="flex animate-pulse space-x-4">
        <div className="h-10 w-10 rounded-full bg-slate-700"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-slate-700"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-slate-700"></div>
              <div className="col-span-1 h-2 rounded bg-slate-700"></div>
            </div>
            <div className="h-2 rounded bg-slate-700"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
