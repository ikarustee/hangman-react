import "./App.css"
import React, {useState, useEffect} from "react"
import Drawing from "./components/Drawing"
import Header from "./components/Header"
import WrongLetters from "./components/WrongLetters"
import Word from "./components/Word"
import { notification } from "./components/Helpers"
import NotificationPopup from "./components/NotificationPopup"
import Alert from "./components/Alert"

// const wordList = ['abcdefghijkl']
const wordList = ["declaration", "tractor", "library", "computerscience"]
let selectedWord = wordList[Math.floor(Math.random() * wordList.length)]

function App() {
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
    const random = Math.floor(Math.random() * wordList.length)
    selectedWord = wordList[random]
  }

  // Eventlisteners if no input field is implemented
  useEffect(()=>{
    const handleKeydown = (e) => {
      // descructure event
      const {key, keyCode} = e
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
    // Alternativ: put in a dependency
    // Only fires if the dependencies change
  }, [correctLetters, wrongLetters, playable])

  return (
    <div className="App">
    {/* Maybe this project was way too difficult for us */}
      <Header />
        <div className="game">
          <Drawing wrongLetters={wrongLetters} />
          <WrongLetters wrongLetters={wrongLetters} />
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
          <NotificationPopup popup={notificationPopup} />
          <Alert correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
        </div>
    </div>
  )
}

export default App
