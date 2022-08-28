import React from 'react'
import { Link } from 'react-router-dom'
import ValorantAgent from './ValorantAgent'

// Currently supported agents:
// const agents = ['Astra', 'Breach', 'Brimstone', 'Chamber', 'Cypher', 'Fade', 'Jett', 'KAYO', 'Killjoy', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Skye', 'Sova', 'Viper', 'Yoru' ];

export default function AccountCard({ username, alias, agent }) {
  const handleFocus = (e) => {
    e.target.scrollIntoView({ behavior: 'smooth', inline: 'center' })
  }

  return (
    <Link
      to={`/account/${username}`}
      className="group relative w-fit flex-shrink-0 flex-grow select-none overflow-visible overflow-y-clip p-1 py-8 outline-none"
      onFocus={handleFocus}
    >
      <div className="flex h-full flex-col justify-center leading-none">
        <div className="rounded-md border border-neutral-800 bg-neutral-900 px-3 py-3 pr-[6rem] text-left shadow-md shadow-neutral-900/20 ring-0 transition duration-200 hover:ring-1 group-hover:!border-valred group-hover:!bg-valred-800 group-hover:!text-valred-100 group-hover:ring-1 group-hover:!ring-valred group-focus-visible:border-valred-800 group-focus-visible:bg-valred-900 group-focus-visible:text-valred-100 group-focus-visible:ring-1 group-focus-visible:ring-valred-800 group-active:scale-95 group-active:!border-valred group-active:!bg-valred-900 group-active:ring-1 group-active:!ring-valred group-active:will-change-transform">
          {/* <h2 className="text-xs font-semibold uppercase text-neutral-600 transition duration-200 group-hover:!text-valred-600 group-focus-visible:text-valred-600/75">
            Username
          </h2> */}
          <h1 className="max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap transition duration-200">
            {username}
          </h1>
          <h3 className="mt-3 max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap font-medium uppercase text-neutral-500 transition duration-200 group-hover:!text-valred-600 group-focus-visible:text-valred-600/75">
            {alias}
          </h3>
        </div>
      </div>

      <div className="pointer-events-none absolute top-0 right-0 mr-4 flex h-full items-center will-change-transform">
        <ValorantAgent
          className="w-20 object-contain object-right transition-transform will-change-transform group-hover:scale-[115%] group-focus-visible:scale-[115%] group-active:scale-105"
          name={agent}
        />
      </div>
    </Link>
  )
}
