import "./App.css"
import React from "react"
import Figure from "./components/Figure"
import Header from "./components/Header"
import WrongLetters from "./components/WrongLetters"
import Word from "./components/Word"

const wordList = ["declaration", "tractor", "library", "computer"]
let selectedWord = wordList[Math.floor(Math.random() * wordList.length)]

function App() {
  const checkIfLetterIsPresent = (event) => {
    if (selectedWord.split("").includes(event.target.value)) {
      // console.log('yes')
      // correct letter has to be added to a empty array, keep adding the item
      //
    }
  }
  return (
    <div className="App">
      <Header />
      <Figure />
      <WrongLetters />
      <input onKeyUp={checkIfLetterIsPresent} />
      <Word selectedWord={selectedWord} />
    </div>
  )
}

export default App
