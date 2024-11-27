import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

function winner(data){
return new Promise((resolve,reject)=>{
        axios.post("https://auction-website-server.onrender.com/iswin",data[data.length-1]).then(data=>{
            resolve(data)
        }).catch(err=>{
            reject(err.message)
        })
})
}
const Bid=({boxVisibility,startBid})=>{
    const [bidderList,setBidderList]=useState([])
    const [bidState,setBidState]=useState(false)
    const {pathname}=useLocation()
    const id=pathname.split("/")
    useEffect(()=>{
fetch(`https://auction-website-server.onrender.com/bid/${id[2]}`).then(data=>{
   return data.json()
}).then(data=>{
   setBidderList(data)
   setBidState(!bidState)
})
if(startBid){

    winner(bidderList).then(data=>{
        // console.log("==>data",data)
    })
    .catch(err=>{
        // console.log(err.response)
    })
}
    },[])
return (
    <>
    <div className="bids-container" id={boxVisibility?"hidden":"visible"}>
    {bidderList.map(bidder=>{
        return (
            <>
            <div className="box" >
    <div>
        <img src={bidder.bidder.profilePicture} alt="bidder-profile" height="15px" width="15px"/>
    </div>
    <div>
        <span>{bidder.bidder.fullName}</span>
    </div>
    <div style={{display:"flex",flexDirection:"column"}}>
        <span>Bid Amount :</span>
        <span>{bidder.bidAmount}</span>
    </div>  
   </div>
            </>
        )
    })}
    </div>
   
    </>
)
}
export default Bid
