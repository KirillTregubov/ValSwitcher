import { useState, useEffect } from 'react'

export function useAccount(accountId) {
  const [accountData, setAccountData] = useState(null)

  console.log('rerun hook')

  useEffect(() => {
    console.log('Account', accountId)

    const response = window.app.emitSync('get-account', {
      username: accountId
    })
    console.log('res', response)

    // ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    // return () => {
    //   ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    // };
  })

  return accountData
}
