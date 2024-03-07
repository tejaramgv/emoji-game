import {useState,useRef,useEffect,useContext} from 'react'
import AudioPlayer from 'react-audio-player';
import axios from 'axios'
import EmojiCard from '../EmojiCard'
import './index.css'
import WinOrLoseCard from '../WinOrLoseCard'
import {store} from '../../App'

const EmojiGame = props => {
  const {emojisList} = props
  const [list, setList] = useState(emojisList)
  const [leader,setLeader]=useState("")
  const [clicked, setClicked] = useState([])
  const [out, setOut] = useState({res: false})
  const [result, setRes] = useState({count: 0, top: 0})
  const [rounds,setRounds]=useState({score:0,round:1})
  const audioRef=useRef(null)
  const [toggle,setToggle]=useContext(store)
  const [playagain,setPlayAgain]=useState(true);
  const [time, setTime] = useState(50)
  const [start,setStart]=useState(false)
  // TIMER
  const starter=()=>{
    setStart(true)
  }
  useEffect(() => {
    const interval = setInterval(
      () => {
        if (time > 0 && start) {
          setTime(time - 1)
        }
        
        else if(time===0){
          setOut({res:true})
          setStart(false)
          clearInterval(interval)
        }
        else {
         
          clearInterval(interval)
        }
      },

      1000,
    )
    return () => clearInterval(interval)
  }, [time, start])




//ON EVERY CARD CLICK
  const handleCardClick = id => {
    if(start){
    if (clicked.some(each => each === id)) {
      setOut({res: true})
      setStart(false)
      setTime(50)
    } else {
      setClicked([...clicked, id])
      console.log(clicked)
      setRes({
        ...result,
        count: result.count + 1,
        top: result.top <= result.count ? result.count + 1 : result.top,
      })
      setRounds({...rounds,score:rounds.score+1})

      const shuffledEmojisList = [...emojisList].sort(() => Math.random() - 0.5)
      setList(shuffledEmojisList)
    }
  }
}
  //GET TOP SCORE
  const GetScore=async()=>{
    try{
      const otp=localStorage.getItem("otp")
      
    const token=localStorage.getItem('token')
    const url = 'https://emoji-game-3.onrender.com/api/v1/auth/getscore';
  
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  
if(token && otp){
  const res=await axios.get(url,{headers})
  if( res.data.success){
    console.log(res.data.message)
    console.log(res.data.leader)
    setRes({...result,top:res.data.message})
    setLeader(res.data.leader)}
  
  else{
   console.log(res.data.message) 
  }
    }}
    catch(e){
      console.log("error:"+e)
    }}
    useEffect(()=>
    {
      GetScore()

    },[playagain])

  //SET ROUNDS
  //MOKEY SOUND




  
  useEffect(() => {
  
    if (rounds.score === 12) {
      setRounds((prevRounds) => ({ ...prevRounds, score: 0, round: rounds.round + 1 }));
      setTime(30)
      setClicked([]);
  
      // Use a ref to access the AudioPlayer component and play the sound
      if (audioRef.current) {
        audioRef.current.audioEl.current.play();
      }
    }
  }, [rounds]);
  

  const playAgain = () => {
    setPlayAgain(!playagain);
    setTime(30)
    setOut({res: false})
    setRes({...result, count: 0})
    setClicked([])
    setRounds({score:0,round:1})
  }
  return (
    <>
      {!toggle? (
        <div className="mon">
          <center>
        <div className="monkeyCard">
        <img className="monkey" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd7RSVObLTyOUjtb3Deu8V9gqKazzhYnbNwhPZDWsNRXY1jBC5Pwelx_ZmAYIHoBFg7xE&usqp=CAU" alt=""/>
        <div>
          <h1>Welcome to Laugh Line!</h1>
          <p> where emojis sounds, laughter echoes, and every move brings joy! <span>😄🎮</span></p>
          <p>Login/Register to Start the game</p>
        </div>
        </div>
        </center>
        <AudioPlayer
                ref={audioRef}
                autoPlay={true}
                src="./monkey-128368.mp3"
                onPlay={(e) => console.log(e)}
              />
        </div>
      ) : (
        <>
          {(rounds.score === 12 || rounds.score === 0) && (
            <>
              <h1 className="rounds">Round: {rounds.round}</h1>
              <AudioPlayer
                ref={audioRef}
                autoPlay={true}
                src="./going-to-the-next-level-114480.mp3"
                onPlay={(e) => console.log(e)}
              />
            </>
          )}

        {!out.res &&  <center> <div className="scorecard">
          <div className="board">
            <span className="leader">Leader Board</span>
             <img className="leader-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5k-W-W4FESsmSymS7Xo5CR6HpAU56fIP1EA&usqp=CAU" alt=""/>
        <span>{leader}</span></div>
          <div><span className="scores">Score {result.count}</span>
            <span className="scores">Top Score {result.top}</span></div>
            <div className="timer">
            <img src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png" alt=""/>
            <span>{time}sec</span></div>
          {!start&&  <img className="startbutton" onClick={starter}src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png " alt=""/>}
            </div></center>
}
          <div className="box">
            <ul className="container">
              {!out.res ? (
                list.map((each) => (
                  <EmojiCard key={each.id} item={each} started={start} func={handleCardClick} />
                ))
              ) : (
                <WinOrLoseCard gamecount={result.count} top={result.top} funct={playAgain} />
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
              } 

         
              
              export default EmojiGame