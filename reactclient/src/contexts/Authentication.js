import React from "react"

const reducer = (state, action) => {
	switch (action.key) {
		case "authentication":
			return {
				...state,
				isAuthenticated: action.value
			}
		default:
			return state
	}
}

const initialState = {
	isAuthenticated: false
};

export const AuthenticationContext = React.createContext({
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
