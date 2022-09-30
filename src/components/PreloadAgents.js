import agents from '../lib/Agents'

const PreloadAgents = () => {
  return (
    <div className="hidden" aria-hidden="true">
      {agents.map((agent) => (
        <img
          key={agent}
          className="hidden"
          src={`./images/${agent}.png`}
          alt=""
        />
      ))}
    </div>
  )
}

export default PreloadAgents
