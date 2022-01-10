import React from "react";

export default function Header({countWonGames, countLostGames}) {
  return (
    <div className="header">
      <h1>Hangman – Guess what word it is!</h1>
      <h3>Hit a letter on your keyboard</h3>
    <div className="counter">
      <h6><span>Played games:<br/>{countWonGames + countLostGames}</span><span>Won games:<br/>{countWonGames}</span><span>Lost games:<br/>{countLostGames}</span></h6>
    </div>
    </div>
  );
}
