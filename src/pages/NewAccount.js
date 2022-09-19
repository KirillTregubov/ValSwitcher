import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Combobox, Transition } from '@headlessui/react'
import {
  CheckIcon,
  ChevronLeftIcon,
  ExclamationIcon,
  PlusCircleIcon
} from '@heroicons/react/solid'
import agents from '../lib/Agents'

import Button from '../components/Button'
import ValorantAgent from '../components/ValorantAgent'
import Input from '../components/Input'

export default function NewAccount() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [usernameWarning, setUsernameWarning] = useState(null)
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [agentWarning, setAgentWarning] = useState(null)
  const [query, setQuery] = useState('')
  const [alias, setAlias] = useState('')

  const filteredAgents =
    query === ''
      ? agents
      : agents.filter((agent) => {
          return agent
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        })

  const handleUsernameWarning = (input = null) => {
    if (input === null) {
      input = username
    }

    const usernameTaken = window.app.emitSync('username-taken', {
      username: input
    })
    if (usernameTaken?.success && usernameTaken.data) {
      setUsernameWarning('Username already taken.')
      return false
    } else if (input.length > 0) {
      setUsernameWarning(null)
      return true
    } else {
      setUsernameWarning('Riot ID cannot be empty.')
      return false
    }
  }

  const handleUsername = (event) => {
    setUsername(event.target.value)
    handleUsernameWarning(event.target.value)
  }

  const handleAgentWarning = (input) => {
    if (agents.includes(selectedAgent)) {
      setAgentWarning(null)
      return true
    } else {
      setAgentWarning('Must choose an agent.')
      return false
    }
  }

  const handleAlias = (event) => {
    setAlias(event.target.value)
  }

  const createAccount = async () => {
    if (
      !handleUsernameWarning(username) ||
      !handleAgentWarning(selectedAgent)
    ) {
      return
    }

    const response = await window.app.emitSync('create-account', {
      username,
      agent: selectedAgent,
      alias
    })

    if (response?.success) {
      navigate(`/account/${username}`)
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl select-none">
      <Button text isLink to={-1} className="group inline-flex">
        <ChevronLeftIcon className="h-5 w-5 transition-transform ease-linear group-focus-within:-translate-x-0.5 group-hover:-translate-x-0.5 " />
        <span>Back</span>
      </Button>

      <div className="relative flex flex-col rounded-3xl border-neutral-800 bg-neutral-900 px-6 py-6 shadow-md">
        <div className="flex w-full items-center justify-between space-x-4">
          <div className="mr-3 flex-grow space-y-2">
            <h1 className="mb-1 text-xl font-bold text-neutral-50">
              Add a New Account
            </h1>
            <Input
              value={username}
              onChange={handleUsername}
              placeholder="Riot ID"
              type="text"
              autoComplete="username"
              minLength="1"
              title="Riot ID"
            />
            {usernameWarning && (
              <p
                className={`!mb-1 flex animate-pulse items-center text-sm text-amber-500`}
                key={usernameWarning}
              >
                <ExclamationIcon className="mr-1 h-5 w-5" />
                {usernameWarning}
              </p>
            )}
            <Combobox value={selectedAgent} onChange={setSelectedAgent}>
              <div className="comboscroll relative mt-1">
                <div className="relative w-full cursor-default">
                  <Combobox.Button as="div">
                    <Combobox.Input
                      className="w-full rounded-md border border-neutral-700 bg-neutral-800 p-2 text-neutral-200 placeholder-neutral-500 shadow-sm outline-none transition-all duration-200 hover:border-neutral-500 hover:ring-1 hover:ring-neutral-500 focus-visible:border-neutral-700 focus-visible:bg-neutral-900 focus-visible:ring-1 focus-visible:ring-neutral-700"
                      onChange={(event) => setQuery(event.target.value)}
                      onFocus={(event) => setQuery(event.target.value)}
                      placeholder="Select an Agent"
                      title="Select an Agent"
                    />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery('')}
                >
                  <Combobox.Options className="absolute z-10 mt-1 max-h-28 w-full overflow-auto rounded-md bg-neutral-800 text-base text-neutral-200 shadow-lg ring-0 focus:outline-none sm:text-sm">
                    {filteredAgents.length === 0 && query !== '' ? (
                      <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                        Not an agent name.
                      </div>
                    ) : (
                      filteredAgents.map((agent) => (
                        <Combobox.Option
                          key={agent}
                          className={({ active }) =>
                            `relative cursor-default select-none py-3 pl-10 pr-4 ${
                              active ? 'bg-valred-500 text-white' : ''
                            }`
                          }
                          value={agent}
                        >
                          {({ selected, active }) => (
                            <>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-valred-500'
                                  }`}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                  <ValorantAgent
                                    className="w-6 object-contain object-right "
                                    name={agent}
                                  />
                                </span>
                              )}
                              <span
                                className={`block truncate ${
                                  selected ? 'font-semibold' : 'font-normal'
                                }`}
                              >
                                {agent}
                              </span>
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
            {agentWarning && (
              <p
                className={`!mb-1 flex animate-pulse items-center text-sm text-amber-500`}
                key={agentWarning}
              >
                <ExclamationIcon className="mr-1 h-5 w-5" />
                {agentWarning}
              </p>
            )}
            <Input
              value={alias}
              onChange={handleAlias}
              placeholder="Account Alias (optional)"
              type="text"
              autoComplete="username"
              minLength="1"
              title="Account Alias (optional)"
            />
            <div className="pt-1">
              <Button text onClick={createAccount} className="group mb-0">
                <PlusCircleIcon className="mr-0.5 h-5 w-5 " />
                <span>Create Account</span>
              </Button>
            </div>
          </div>
          <ValorantAgent
            className="w-28 object-contain object-right transition-transform will-change-transform group-hover:scale-[115%] group-focus-visible:scale-[115%]"
            name={selectedAgent}
          />
        </div>
      </div>
    </div>
  )
}
