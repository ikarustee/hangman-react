import React from "react";

function WrongLetters({wrongLetters}) {
  return (
    <div className="wrongletters-container">
      <div>
      {wrongLetters.length > 0 && <h3>Wrong guessed letters</h3>}
        {wrongLetters
        .map((letter, i) => <span key={i} className="wrongletter">{letter}</span>)
        .reduce((prevValue, currValue) => prevValue === null ? [currValue] : [prevValue, ', ', currValue], null )
        }
      </div>
    </div>
  );
}

export default WrongLetters