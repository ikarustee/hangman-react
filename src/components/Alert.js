import React, { useEffect } from 'react'
import { checkWin } from './Helpers'

const Alert = ({correctLetters, wrongLetters, selectedWord, setPlayable, playAgain}) => {
    // set initial states 
    let alertMessage = '';
    let alertMessageWord = '';
    let playable = true;

    if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ) {
        alertMessage = 'You won! 🏆';
        playable = false;
    } else if( checkWin(correctLetters, wrongLetters, selectedWord) === 'lose') {
        alertMessage = 'You lose! 🤡';
        alertMessageWord = `The word was: ${selectedWord}`;
        playable = false;
    }  

    useEffect(() => {
        setPlayable(playable)
    })

    return (
        <>
        {playable ? ('') : (
            <div className='alert' style={alertMessage !== '' ? {display:'flex'} : {}}>
            <div className='alertmessage'>
                <h2>{alertMessage}</h2>
                <h3>{alertMessageWord}</h3>
                {/* Dear Chris, this is what I really could remember and what I did not have to look up. Thanks to you*/ }
                {/* If the game is playable, hide the button */}
                {playable ? ('') : (<button onClick={playAgain}>Play again!</button>)}
            </div>
        </div>
        )}
        </>
    )
}

export default Alert
