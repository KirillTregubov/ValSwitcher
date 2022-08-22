/* Written to fix  */
import { useRef } from 'react'
import { Transition } from 'react-transition-group'

const MyTransition = ({ children, ...props }) => {
  const nodeRef = useRef(null)

  return (
    <Transition nodeRef={nodeRef} {...props}>
      <div ref={nodeRef}>{children}</div>
    </Transition>
  )
}

export default MyTransition
