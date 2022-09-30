import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeftIcon, TrashIcon } from '@heroicons/react/solid'

import { useAccount } from '../lib/Account'
import ValorantAgent from '../components/ValorantAgent'
import Button from '../components/Button'

const Account = () => {
  const username = useParams().id

  return <AccountPage username={username} />
}

const AccountPage = React.memo(({ username }) => {
  console.log('rerender')
  let navigate = useNavigate()
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
    console.log('auth resp: ' + JSON.stringify(response) + ' or ' + response)
  }

  function deleteAccount() {
    console.log('Init delete')
    const response = window.app.emitSync('delete-account', {
      username
    })
    console.log('auth resp: ' + JSON.stringify(response) + ' or ' + response)
    if (response?.success) {
      navigate('/home')
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      {/* <div className="absolute z-10 inset-0 flex justify-center items-center"> */}
      {/* <Link
        className="mb-2 inline-flex items-center rounded-full font-medium text-neutral-400 outline-none ring-neutral-600 hover:text-neutral-200 focus-visible:ring-2 active:scale-95 active:will-change-transform"
        to={'/home'}
      >
        <ChevronLeftIcon className="h-5 w-5" />
        <span>All Accounts</span>
      </Link> */}
      <Button text isLink to={'/home'} className="group inline-flex">
        <ChevronLeftIcon className="h-5 w-5 transition-transform ease-linear group-focus-within:-translate-x-0.5 group-hover:-translate-x-0.5 " />
        <span>Home</span>
      </Button>
      <div className="relative flex flex-col rounded-3xl border-neutral-800 bg-neutral-900 px-5 py-6 shadow-md">
        {/* <div className="absolute top-0 right-0 flex h-10 items-center p-2 px-3">
<button className="outline-none focus-visible:ring-2 ring-neutral-600 rounded-sm" onClick={close}><XIcon className="h-5" /></button>
        </div> */}
        {/* TODO: show agent and finish authenticate */}
        <div>Account: {username}</div>
        <ValorantAgent
          className="w-20 object-contain object-right transition-transform will-change-transform group-hover:scale-[115%] group-focus-visible:scale-[115%]"
          name={account?.agent || 'Jett'}
        />
        <button onClick={authenticate}>Authenticate</button>
        <div>
          <Button text onClick={deleteAccount} className="group">
            <TrashIcon className="mr-0.5 h-5 w-5 " />
            <span>Delete Account</span>
          </Button>
        </div>
      </div>
    </div>
  )
})

export default Account
