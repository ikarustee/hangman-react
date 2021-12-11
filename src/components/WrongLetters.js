import React from "react";

function WrongLetters({wrongLetters}) {
  /* Add comma between the wrong letters in the list / in the spans */
  return (
    <div className="wrongletters-container">
      <div>
      {/* Only shows if there are wrong guessed letters */}
      {wrongLetters.length > 0 && <h3>Wrong guessed letters</h3>}
        {wrongLetters
        /* Show the wrong letters on the display */ 
        .map((letter, i) => <span key={i} className="wrongletter">{letter}</span>)
        /* Take the last wrong letter, create a new array with the new wrong guessed letter, separate them with a comma */ 
        .reduce((prevValue, currValue) => prevValue === null ? [currValue] : [prevValue, ', ', currValue], null )
        }
      </div>
    </div>
  );
}

export default WrongLetters