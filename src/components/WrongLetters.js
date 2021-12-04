import React from "react";

function WrongLetters({wrongLetters}) {
  /* Add comma between the wrong letters in the list / in the spans */
  return (
    <div className="wrong-letters-container">
      <div>
      {wrongLetters.length > 0 && <p>Wrong</p>}
        {wrongLetters
        .map((letter, i) => <span key={i} className="wrongletter">{letter}</span>)
        .reduce((prevValue, currValue) => prevValue === null ? [currValue] : [prevValue, ', ', currValue], null )
        }
      </div>
    </div>
  );
}

export default WrongLetters