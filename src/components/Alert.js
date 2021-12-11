import React, { useEffect } from 'react'
import { checkWin } from './Helpers'

const Alert = ({correctLetters, wrongLetters, selectedWord, setPlayable, playAgain}) => {
    let alertMessage = '';
    let alertMessageWord = '';
    let playable = true;

    if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ) {
        alertMessage = 'You won! 🏆';
        playable = false;
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
                {playable ? ('') : (<button onClick={playAgain} className='btn'>Play again!</button>)}
            </div>
        </div>
        )}
        </>
    )
}

export default Alert
