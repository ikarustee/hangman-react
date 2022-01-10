import React from "react";

export default function Header({countWonGames, countLostGames}) {
  return (
    <div className="header">
      <h1>Hangman – Guess what word it is!</h1>
    <div className="counter">
      <h3>Hit a letter on your keyboard</h3>
      <h4>Played games: {countWonGames + countLostGames} | Won games: {countWonGames} | Lost games: {countLostGames}</h4>
    </div>
    </div>
  );
}
