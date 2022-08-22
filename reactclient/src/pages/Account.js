import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/solid'

import { useAccount } from '../lib/Account'
import ValorantAgent from '../components/ValorantAgent'

const Account = () => {
  const username = useParams().id

  return <AccountPage username={username} />
}

const AccountPage = React.memo(({ username }) => {
  console.log('rerender')
  const account = useAccount(username)
  console.log('component account', account)

  function callback(response) {
    console.log('callback')
    console.log(response)
  }

  function authenticate() {
    console.log('Init download')

    window.app.listen('authenticate-account', callback)
    const response = window.app.emitSync('authenticate-account', {
      username
    })
    console.log('auth resp: ' + response.toString() + ' or ' + response)
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      {/* <div className="absolute z-10 inset-0 flex justify-center items-center"> */}
      <Link
        className="mb-2 inline-flex items-center rounded-full pr-2 font-medium text-zinc-400 outline-none ring-zinc-600 focus-visible:ring-2"
        to={'/home'}
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <span>All Accounts</span>
      </Link>
      <div className="relative flex flex-col rounded-3xl border-valneutral-900 bg-valneutral-700 px-5 py-6 shadow-md">
        {/* <div className="absolute top-0 right-0 flex h-10 items-center p-2 px-3">
<button className="outline-none focus-visible:ring-2 ring-zinc-600 rounded-sm" onClick={close}><XIcon className="h-5" /></button>
        </div> */}
        {/* TODO: show agent and finish authenticate */}
        <div>Account: {username}</div>
        <ValorantAgent
          className="w-20 object-contain object-right transition-transform will-change-transform group-hover:scale-[115%] group-focus-visible:scale-[115%]"
          name={'Neon'}
        />
        <button onClick={authenticate}>Authenticate</button>
      </div>
    </div>
  )
})

export default Account
