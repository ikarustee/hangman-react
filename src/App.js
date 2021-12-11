import "./App.css"
import React, {useState, useEffect} from "react"
import { notification } from "./components/Helpers"
import Drawing from "./components/Drawing"
import Header from "./components/Header"
import WrongLetters from "./components/WrongLetters"
import Word from "./components/Word"
import NotificationPopup from "./components/NotificationPopup"
import Alert from "./components/Alert"

function App() {
  const [words, setWords] = useState([])
  const [selectedWord, setSelectedWord] = useState('')
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [notificationPopup, setNotificationPopup] = useState(false)

  const playAgain = () => {
    setPlayable(true)
    setWrongLetters([])
    setCorrectLetters([])

    const random = Math.floor(Math.random() * words.length)
    setSelectedWord(words[random])
  }

  useEffect(() => {
    fetch('https://random-word-api.herokuapp.com/word?number=10')
      .then((res) => res.json())
      .then((res) => setWords(res))
  }, [])

  useEffect(() => {
    console.log(words)
    setSelectedWord(words[Math.floor(Math.random() * words.length)])
  }, [words])
  useEffect(()=>{
    const handleKeydown = (e) => {
      const {key, keyCode} = e
      console.log(key, keyCode, selectedWord, playable)
      if(playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase()
        if(selectedWord.includes(letter)) {
          if(!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter])
          } else {
            notification(setNotificationPopup)
          }
        } else {
          if(!wrongLetters.includes(letter)){
            setWrongLetters((wrongLetters) => [...wrongLetters, letter])
          } else {
            notification(setNotificationPopup)
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [correctLetters, wrongLetters, playable, selectedWord])

  return (
    <div className="App">
        {selectedWord ? (
          <div className="main">
          <Header />
          <div className="game">
          <Drawing wrongLetters={wrongLetters} />
          <WrongLetters wrongLetters={wrongLetters} />
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
          <NotificationPopup popup={notificationPopup} />
          <Alert correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
        </div>
        </div>
        ) : ('')}
    </div>
  )
}

export default App
