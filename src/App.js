import "./App.css"
import React, {useState, useEffect} from "react"
import { notification } from "./components/Helpers"
import Drawing from "./components/Drawing"
import Header from "./components/Header"
import WrongLetters from "./components/WrongLetters"
import Word from "./components/Word"
import NotificationPopup from "./components/NotificationPopup"
import Alert from "./components/Alert"
import {checkWin} from "./components/Helpers"


function App() {
  const [words, setWords] = useState([])
  const [selectedWord, setSelectedWord] = useState('')
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [notificationPopup, setNotificationPopup] = useState(false)
  const [countWonGames, setCountWonGames] = useState(parseInt(localStorage.getItem('wonGames')) || 0)
  const [countLostGames, setCountLostGames] = useState(parseInt(localStorage.getItem('lostGames')) ||0)
  const [playedGames, setPlayedGames] = useState(parseInt(localStorage.getItem('totalPlayedGames')) || 0)

  function countGames() {
    if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ) {
      setCountWonGames((prevWon) => prevWon + 1)
    } else if( checkWin(correctLetters, wrongLetters, selectedWord) === 'lose') {
      setCountLostGames((prev) => prev + 1)
    }
    setPlayedGames((prev) => prev + 1)
  }

  const getRandomWords = () => {
    fetch('https://random-word-api.herokuapp.com/word?number=10')
      .then((res) => res.json())
      .then((res) => setWords(res))
}

  useEffect(() => {
    getRandomWords()
  }, [])

  const playAgain = () => {
    setPlayable(true)
    setWrongLetters([])
    setCorrectLetters([])
    getRandomWords()
    countGames()
  }

  useEffect(() => {
    setSelectedWord(words[Math.floor(Math.random() * words.length)])
  }, [words])

  useEffect(()=>{
    const handleKeydown = (e) => {
      const {key, keyCode} = e
      // console.log(key, keyCode, selectedWord, playable)
      console.log(selectedWord)
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

  useEffect(() => {
    localStorage.setItem('wonGames', countWonGames)
    localStorage.setItem('lostGames', countLostGames)
    localStorage.setItem('totalPlayedGames', playedGames)
  }, [countWonGames, countLostGames, playedGames])

  return (
    <div className="App">
        {selectedWord ? (
          <div className="main">
          <Header  countWonGames={countWonGames} countLostGames={countLostGames} playedGames={playedGames} />
          <div className="game">
          <Drawing wrongLetters={wrongLetters} />
          <WrongLetters wrongLetters={wrongLetters}/>
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