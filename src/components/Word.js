import React from "react";

export default function Word({ selectedWord, correctLetters }) {
    return (
      <div className="word">
      {/* // Split word into single letters
      // loop over the word / letters to display every single letter */}
        {selectedWord.split('').map((letter, i) => {
          return (
            /* Key added. Everything we are looping over needs a key. */
            <span className="letter" key={i}>
            {/* We are checking if it includes the letter from the selected word. Checking to see if its inside of the correct letters array  */}
              {correctLetters.includes(letter) ? letter : ''}
            </span>
          )
        })}
      </div>
    )
}