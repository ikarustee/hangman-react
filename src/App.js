import "./App.css"
import React, {useState, useEffect} from "react"
import { notification } from "./components/Helpers"
import Drawing from "./components/Drawing"
import Header from "./components/Header"
import WrongLetters from "./components/WrongLetters"
import Word from "./components/Word"
import NotificationPopup from "./components/NotificationPopup"
import Alert from "./components/Alert"

// const words = ['abcdefghijkl']
// Maybe we can also use an API to create more random words

function App() {
  const [words, setWords] = useState([])
  // const words = ["declaration", "tractor", "library", "computerscience"]
  // let selectedWord = words[Math.floor(Math.random() * words.length)]
  const [selectedWord, setSelectedWord] = useState('')
  // Check if game can be played (user won or lost)
  const [playable, setPlayable] = useState(true)
  // Check the correct letters
  const [correctLetters, setCorrectLetters] = useState([])
  // Check the wrong letters
  const [wrongLetters, setWrongLetters] = useState([])
  // Initial state for the notification if user hits a letter twice
  const [notificationPopup, setNotificationPopup] = useState(false)

  const playAgain = () => {
    // set playstate to true to play a new game
    setPlayable(true)
    // Empty the letter arrays
    setWrongLetters([])
    setCorrectLetters([])

    // Get a new word when game was won or lost
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
    // setSelectedWord('apple')
  }, [words])

  // Eventlisteners if no input field is implemented
  useEffect(()=>{
    const handleKeydown = (e) => {
      // descructure event
      const {key, keyCode} = e
      console.log(key, keyCode, selectedWord, playable)
      // If game is playable and keys are a-z
      if(playable && keyCode >= 65 && keyCode <= 90) {
        // set letters to lowercase
        const letter = key.toLowerCase()
        // if the selected word includes the key that is hit
        if(selectedWord.includes(letter)) {
          // if the current correct letters do not include the letter
          if(!correctLetters.includes(letter)) {
            // take the current letters, create new array from a copy, spread all current letters we have and add the new letter
            setCorrectLetters((currentLetters) => [...currentLetters, letter])
          } else {
            // Show notification if user hits a letter more than once
            // This comes from the helper.js not from the notificationpopup
            // The helper contains the setter eather true or false, so showing up the popup or not
            notification(setNotificationPopup)
          }
        } else {
          // if the letter is not a correct letter
          if(!wrongLetters.includes(letter)){
            // take the current wrong letters and add the new wrong letter into the new copied array
            setWrongLetters((wrongLetters) => [...wrongLetters, letter])
          } else {
            // Show notification if user hits a letter more than once
            notification(setNotificationPopup)
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
    // Empty array will call useEffect only on the initial render
    // Only fires if the dependencies change
  }, [correctLetters, wrongLetters, playable])

  return (
    <div className="App">
    {/* Maybe this project was way too difficult for us */}
      <Header />
        {selectedWord ? (
          <div className="game">
          <Drawing wrongLetters={wrongLetters} />
          <WrongLetters wrongLetters={wrongLetters} />
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
          <NotificationPopup popup={notificationPopup} />
          <Alert correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
        </div>
        ) : (
          <div>Empty game</div>
        )}
    </div>
  )
}

export default App
