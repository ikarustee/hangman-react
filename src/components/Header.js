import React from "react";

export default function Header({ countWonGames, countLostGames, playedGames}) {
  
  return (
    <div className="header">
      <h1>Hangman – Guess what word it is!</h1>
      <h3>Hit a letter on your keyboard</h3>
    <div className="counterholder">
          <span className="counter">Played games:<br/>{playedGames}</span><span className="counter">Won games:<br/>{countWonGames}</span><span className="counter">Lost games:<br/>{countLostGames}</span>
    </div>
    </div>
  );
}
