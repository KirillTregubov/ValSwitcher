import React from 'react'
// import ReactPlaceholder from "react-placeholder";

// Currently supported agents:
const agents = [
  'Astra',
  'Breach',
  'Brimstone',
  'Chamber',
  'Cypher',
  'Fade',
  'Jett',
  'KAYO',
  'Killjoy',
  'Neon',
  'Omen',
  'Phoenix',
  'Raze',
  'Reyna',
  'Sage',
  'Skye',
  'Sova',
  'Viper',
  'Yoru'
]

function getImage(name, className, onLoad) {
  if (agents.includes(name))
    return (
      <img
        className={`w-full ${className}`}
        src={`./images/${name}.png`}
        alt={`Artwork of ${name}`}
        draggable="false"
        onLoad={onLoad}
      />
    )
  else
    return (
      <img
        className={`w-full brightness-0 ${className}`}
        src={`./images/Jett.png`}
        alt="Artwork of Jett"
        draggable="false"
        onLoad={onLoad}
      />
    )
}

export default function ValorantAgent({ name, className }) {
  // const [loading, setLoading] = useState(true);

  // function handleImageLoad() {
  // 	console.log('stopped loading')
  // 	setLoading(false);
  // }

  // const image = <img src="http://someImage.png" alt="cool image" onLoad={handleImageLoaded} />;

  return getImage(name, className, null)
  // return <div>
  // 	<ReactPlaceholder type="rect" ready={!loading} className="animate-pulse rounded-md ml-4 !mr-0" >
  // 		<div className="imageHolder" >
  // 			{image}
  // 		</div>
  // 	</ReactPlaceholder>
  // 	{ !loading && image }
  // </div>
}
