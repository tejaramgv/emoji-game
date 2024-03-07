import {React,useState,createContext,useEffect} from 'react'
import {jwtDecode} from 'jwt-decode';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import EmojiGame from './components/EmojiGame'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import NavBar from './components/NavBar'

import './App.css'

const emojisList = [
  {
    id: 0,
    emojiName: 'Face with stuck out tongue',
    audio:'./20485212_minion-yelling_by_applehillstudios_preview.mp3',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-img.png',
  },
  {
    id: 1,
    emojiName: 'Face with head bandage',
     audio:'./25096631_emoji-sound-of-cry_by_audiomechanica2_preview.mp3',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-head-bandage-img.png',
  },
  {
    id: 2,
    emojiName: 'Face with hugs',
    audio:'./20485212_minion-yelling_by_applehillstudios_preview.mp3',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-hugs-img.png',
  },
  {
    id: 3,
    emojiName: 'Face with laughing',
    audio:'./25033452_cartoon-character-long-laugh_by_applehillstudios_preview.mp3',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-img.png',
  },
  {
    id: 4,
    emojiName: 'Laughing face with hand in front of mouth',
    audio:'./oh-no-113125.mp3',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-with-hand-infront-mouth-img.png',
  },
  {
    id: 5,
    emojiName: 'Face with mask',
    audio:'./20485212_minion-yelling_by_applehillstudios_preview.mp3',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-mask-img.png',
  },
  {
    id: 6,
    emojiName: 'Face with silence',
    audio:'./25096589_emoji-sound-angry_by_audiomechanica2_preview.mp3',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-silence-img.png',
  },
  {
    id: 7,
    emojiName: 'Face with stuck out tongue and winked eye',
    audio:'./laughter-140503.mp3',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-and-winking-eye-img.png',
  },
  {
    id: 8,
    emojiName: 'Grinning face with sweat',
    audio:'./20485212_minion-yelling_by_applehillstudios_preview.mp3',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/grinning-face-with-sweat-img.png',
  },
  {
    id: 9,
    emojiName: 'Smiling face with heart eyes',
    audio:'./25364186_emoji-kiss_by_audiomechanica2_preview.mp3',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-heart-eyes-img.png',
  },
  {
    id: 10,
    emojiName: 'Grinning face',
    audio:'./20485212_minion-yelling_by_applehillstudios_preview.mp3',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/grinning-face-img.png',
  },
  {
    id: 11,
    emojiName: 'Smiling face with star eyes',
    audio:'./the-magical-surprise-141291.mp3',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-star-eyes-img.png',
  },
]
export const store=createContext()

const App = () =>{
  const [toggle,setToggle]=useState(false);
  console.log(toggle)

  useEffect(()=>{

    const token=localStorage.getItem("token")
    console.log(token)
    if(token){
      const decodedToken=jwtDecode(token)
      console.log("ttt"+decodedToken)
      const isExpired=decodedToken.exp*1000<Date.now()
      if (isExpired){
        setToggle(false)
      }
     else{
      const otp=localStorage.getItem("otp")
      if (otp){
      setToggle(true);}
     }
    
    }
    else{
      setToggle(false)
    }
  
   },[toggle])


  return(
  <>
 
  <BrowserRouter>
  <store.Provider value={[toggle,setToggle]}>
  <NavBar/>
  <Routes>
    <Route path="/" element={<EmojiGame emojisList={emojisList}/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
  </Routes>
  </store.Provider>
  </BrowserRouter>
  </>
)}

export default App