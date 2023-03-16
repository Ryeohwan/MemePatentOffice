// auction page (/auction/:auction_id)

import Scene from "components/auction/main/Scene"

const AuctionPage: React.FC = () => {
  const width = window.innerWidth
  const height = window.innerHeight

  return (
   <>
     <Scene width={width} height={height}/>
    </>
  )
 }
 
 export default AuctionPage; 