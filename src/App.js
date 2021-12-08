import "./App.css"
import React, {useState, useEffect} from "react"
import Figure from "./components/Figure"
import Header from "./components/Header"
import WrongLetters from "./components/WrongLetters"
import Word from "./components/Word"

const wordList = ["declaration", "tractor", "library", "computer"]
let selectedWord = wordList[Math.floor(Math.random() * wordList.length)]

function App() {
  // Check if game can be played
  const [playable, setPlayable] = useState(true)
  // Check the correct letters
  const [correctLetters, setCorrectLetters] = useState([])
  // Check the wrong letters
  const [wrongLetters, setWrongLetters] = useState([])

  // Eventlisteners if no input field is implemented
  useEffect(()=>{
    const handleKeydown = (e) => {
      // descructure event
      const {key, keyCode} = e
      // If game is playable and keys are a-z
      if(playable && keyCode >= 65 && keyCode <= 90) {
        // set letters to lowercase
        const letter= key.toLowerCase()

        // if the selected word includes the key that is hit
        if(selectedWord.includes(letter)) {
          // if the current correct letters do not include the letter
          if(!correctLetters.includes(letter)) {
            // take the current letters, create new array from a copy, spread all current letters we have and add the new letter
            setCorrectLetters((currentLetters) => [...currentLetters, letter])
          } else {
            // notification
          }
        } else {
          // if the letter is not a correct letter
          if(!wrongLetters.includes(letter)){
            // take the current wrong letters and add the new wrong letter into the new copied array
            setWrongLetters((wrongLetters) => [...wrongLetters, letter])
          } else {
            // notification
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
    // Empty array will call useEffect only on the initial render
    // Alternativ: put in a dependency
  }, [correctLetters, wrongLetters, playable])

  return (
    <div>
      <Header />
        <div className="game-container">
          <Figure />
          <WrongLetters wrongLetters={wrongLetters} />
          {/* <input onKeyUp={checkIfLetterIsPresent} /> */}
          <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </div>
    </div>
  )
}

export default App
