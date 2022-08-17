import React, { useCallback, useContext } from 'react'

const reducer = (state, action) => {
  switch (action.key) {
    case 'authentication':
      return {
        ...state,
        authenticated: action.value
      }
    default:
      return state
  }
}

const initialState = {
  authenticated: false
}

const AuthenticationContext = React.createContext({
  state: initialState,
  dispatch: () => null
})

export const AuthenticationProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <AuthenticationContext.Provider value={[state, dispatch]}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext)
  if (context === undefined) {
    throw new Error(
      'useAuthentication must be used within an AuthenticationProvider'
    )
  }
  const [state, dispatch] = context

  const setAuthentication = useCallback(
    (value) => {
      dispatch({
        key: 'authentication',
        value
      })
    },
    [dispatch]
  )

  return [state.authenticated, setAuthentication]
}
