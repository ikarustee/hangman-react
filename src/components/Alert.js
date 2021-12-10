import React, { useEffect } from 'react'
import { checkWin } from './Helpers'

// Props: same names as in the whole application so it works
const Alert = ({correctLetters, wrongLetters, selectedWord, setPlayable, playAgain}) => {
    // set initial states for alertmessage and alertmessagword (no content)
    let alertMessage = '';
    let alertMessageWord = '';
    let playable = true;

    // If correct letters, wrong letters and the selected word are true (right)
    if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ) {
        alertMessage = 'You won! 🏆';
        playable = false;
        // If correct letters, wrong letters and the selected word wrong
    } else if( checkWin(correctLetters, wrongLetters, selectedWord) === 'lose') {
        alertMessage = 'You lose! 🤡';
        alertMessageWord = `The word was: '${selectedWord}'`;
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
                {playable ? ('') : (<button onClick={playAgain} className='btn'>Play again!</button>)}
            </div>
        </div>
        )}
        </>
    )
}

export default Alert
