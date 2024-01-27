import React, { useEffect, useState } from 'react';
import s from './GameGambling.module.css';
import { CSSTransition } from 'react-transition-group';
import './GameGambling.css';

const GameGambling = () => {
    const [mass1, setMass1] = useState([0, 1, 2, 3, 4, 5, 6])
    const [mass2, setMass2] = useState([0, 1, 2, 3, 4, 5, 6])
    const [mass3, setMass3] = useState([0, 1, 2, 3, 4, 5, 6])

    const gameData = [
        {
            id: 1,
            value: mass1
        },
        {
            id: 2,
            value: mass2
        },
        {
            id: 3,
            value: mass3
        }
    ]

    const [textMessage, setTextMessage] = useState('')
    const [showTextMessage, setShowTextMessage] = useState(false)
    const [playAnimation, setPlayAnimation] = useState(false)
    const duration = {
        value: 1300
    }

    const [gameState, setGameState] = useState(() => {
        const defaultSate = gameData.map(el => el.value[0])
        return defaultSate
    })

    

    const handlePlay = () => {
        const newMass1 = []
        for (let i = 0; i < 7; i++) {
            newMass1.push(Math.floor(Math.random() * 7))
            console.log(newMass1)
            setMass1(newMass1)
        }
        console.log(mass1)

        let newGameState = gameData.map((el) => {
            const bandlength = el.value.length
            return el.value[bandlength - 1]
        })
        setShowTextMessage(true)
        setPlayAnimation(true)
        setGameState(gameState.map((el) => ''))
        setTimeout(() => {
            setGameState(newGameState)
            setPlayAnimation(false)
        }, duration.value);   
    }
    

    useEffect(() => {
        if (gameState.length === 3) {
            if (gameState[0] === gameState[1] && gameState[1] === gameState[2]) {
                setTextMessage('Поздравляем, Вы выиграли миллион долларов!')
            } else if (gameState[0] === gameState[1] || gameState[1] === gameState[2] || gameState[0] === gameState[2]) {
                setTextMessage('Совпало два - ты очень близко! Не останавливайся!')
            } else {
                setTextMessage('Жми еще')
            }    
        }
    }, [setGameState, gameState])

    return (
        <div>
            <div className={s.gambling}>
                <div className={s.gamblingWindows}>
                    {gameState.map((el, idx) => (
                        <div className={s.gamblingWindowsItem}>
                            <CSSTransition in={playAnimation} timeout={duration.value} classNames='animationItem'>
                                <div className={s.gamblingWindowsItemList}>
                                    {gameData[idx].value.map((itemList, idx) => (
                                        <div className={s.gamblingWindowsItemListItem} key={`itemList${idx}`}>{itemList}</div>
                                    ))}
                                </div>
                            </CSSTransition>
                            <div key={`gambling${idx}`}>{el}</div> 
                        </div>
                    ))}
                </div>
                <div>
                    <button onClick={handlePlay}>Play</button>
                </div>
                {showTextMessage && <div>{textMessage}</div>}
            </div>
        </div>
    );
}

export default GameGambling;
