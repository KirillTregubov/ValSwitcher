import { useState, useEffect } from 'react'

export function useAccounts() {
  const [accountData, setAccountData] = useState(null)

  console.log('rerun hook')

  useEffect(() => {
    console.log('rerun effect')

    const response = window.app.emitSync('get-accounts')
    console.log('res', response)
    if (response?.success) {
      setAccountData(response.data)
    }
  }, [])

  return accountData
}

export function useAccount(accountId) {
  const [accountData, setAccountData] = useState(null)

  console.log('rerun hook')

  useEffect(() => {
    console.log('Account', accountId)

    const response = window.app.emitSync('get-account', {
      username: accountId
    })
    console.log('res', response)
    if (response?.success) {
      setAccountData(response.data)
    }

    // ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    // return () => {
    //   ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    // };
  }, [accountId])

  return accountData
}
