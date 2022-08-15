import React from 'react'
import { Link, useParams } from 'react-router-dom'
// import FocusTrap from 'focus-trap-react';
import { ChevronLeftIcon } from '@heroicons/react/solid'
// import { Transition } from '../components/Transition';
// import { navigateWithDelay } from '../util';
// import { TransitionContext } from '../contexts/Transition';

function useRenderCounter() {
  const ref = React.useRef()
  React.useEffect(() => {
    ref.current.textContent = Number(ref.current.textContent || '0') + 1
    console.log('rerender counter +1')
  })
  return (
    <span
      style={{
        backgroundColor: '#ccc',
        borderRadius: 4,
        padding: '2px 4px',
        fontSize: '0.8rem',
        margin: '0 6px',
        display: 'inline-block'
      }}
      ref={ref}
    />
  )
}

export default function Account() {
  const accountId = useParams().id
  // const renderCount = useRenderCounter()
  // <p>counter: {renderCount}</p>

  // const [state, setState] = useContext(TransitionContext);
  // setState({ key: 'showing', value: true })
  // let [showing, setShowing] = useState(true);
  // let navigate = useNavigate();

  function callback(response) {
    console.log('callback')
    console.log(response)
  }

  function authenticate() {
    console.log('Init download')
    window.app.listen('riot-sync', callback)

    const response = window.app.emit('riot-sync', {
      username: accountId
    })
    console.log(response)
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
        <div>Account: {accountId}</div>
        <button onClick={authenticate}>Authenticate</button>
      </div>
      {/* </div>*/}
    </div>
  )
}
