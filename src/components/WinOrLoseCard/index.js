// Write your code here.
import { useEffect,useRef } from "react"
import AudioPlayer from 'react-audio-player';
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'
import confetti from "https://cdn.skypack.dev/canvas-confetti"
import './index.css'

const WinOrLoseCard = props => {
  const {gamecount, top,funct} = props
  const audioRef=useRef(null)
  const play = () => funct()
const updateScore=async()=>{
  try{
  const token=localStorage.getItem('token')
  const url = 'http://localhost:8081/api/v1/auth/updatescore';

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

const data = {
  topScore: top,
};

const res=await axios.post(url,data,{headers})
if( res.data.success){
  console.log(res.data.message)}

else{
 console.log(res.data.message) 
}
  }
  catch(e){
    console.log("error:"+e)



  }



}



  
  useEffect(() => {
    if(top<=gamecount){
      updateScore()
    }
    if (gamecount >= 0) {
      confetti();
    }
    if (audioRef.current) {
      audioRef.current.audioEl.current.play();
    }
  }, [gamecount]);

  return (
    <>
      {top <=gamecount ? (
        
       
        <div className="lose">
        
          
          <div>
            <h1>Congragulations!</h1>
            <p>Best Score of you Till Now</p>
            <p>Score: {gamecount}</p>
            <button onClick={play}>Play Again</button>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/won-game-img.png"
            alt="win or lose"
          />
           <AudioPlayer
       ref={audioRef}
       autoPlay={true}
       src="./success-fanfare-trumpets-6185.mp3"
       onPlay={(e) => console.log(e)}
     />
        </div>
      ) : (
        <div className="lose">
          <div>
            <h1>Game Over</h1>
            <p> Oops! You Clicked an emoji twice in this round</p>
            <p>score: {gamecount}</p>
            <button onClick={play}>Play Again</button>
          </div>
          <img     
            src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png "
            alt="win or lose"
          />
           <AudioPlayer
       ref={audioRef}
       autoPlay={true}
       src="./negative_beeps-6008.mp3"
       onPlay={(e) => console.log(e)}
     />
        
     
        </div>
      )}
    </>
  )
}
export default WinOrLoseCard
