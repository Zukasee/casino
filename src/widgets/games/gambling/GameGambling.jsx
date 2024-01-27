import React, { useEffect, useState } from 'react';
import s from './GameGambling.module.css';
import { CSSTransition } from 'react-transition-group';
import './GameGambling.css';

const GameGambling = () => {
  const [bid, setBid] = useState(50)
  const [balance, setBalance] = useState(() => 1000);
  const [isDisabled, setIsDisabled] = useState(false)
  const [mass1, setMass1] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [mass2, setMass2] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [mass3, setMass3] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [currentCase, setCurrentCase] = useState(0)

  const [textMessage, setTextMessage] = useState('');
  const [showTextMessage, setShowTextMessage] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);
  const duration = {
    value: 1300,
  };

  const [gameState, setGameState] = useState(() => {
    const defaultSate = [mass1[0], mass2[0], mass3[0]];
    return defaultSate;
  });

  const gameData = [
    {
      id: 1,
      value: mass1,
    },
    {
      id: 2,
      value: mass2,
    },
    {
      id: 3,
      value: mass3,
    },
  ];


  const handlePlay = () => {
    setIsDisabled(true)
    const newMass1 = mass1.map(() => Math.floor(Math.random() * mass1.length));
    console.log(newMass1)
    setMass1(newMass1);
    console.log(mass1)

    const newMass2 = mass2.map(() => Math.floor(Math.random() * mass2.length));
    setMass2(newMass2);

    const newMass3 = mass3.map(() => Math.floor(Math.random() * mass3.length));
    setMass3(newMass3);

    const newGameData = [
      {
        id: 1,
        value: newMass1,
      },
      {
        id: 2,
        value: newMass2,
      },
      {
        id: 3,
        value: newMass3,
      },
    ];

    if (newMass1[6] === newMass2[6] && newMass2[6] === newMass3[6]) {
        setTimeout(() => {
          setBalance(balance + bid * 10);
        }, duration.value - 10)
      } else if (newMass1[6] === newMass2[6] || newMass2[6] === newMass3[6] || newMass1[6] === newMass3[6]) {
        setTimeout(() => {
          setBalance(balance + bid * 2);
        }, duration.value - 10)
      } else {
        setTimeout(() => {
          setBalance(balance - bid)
        }, duration.value - 10)
      }
    let newGameState = newGameData.map((el) => el.value[el.value.length - 1]);

    setShowTextMessage(false);
    setPlayAnimation(true);
    setGameState(newGameState.map(() => ''));
    setTimeout(() => {
      setGameState(newGameState);
      setPlayAnimation(false);
      setShowTextMessage(true);
      setIsDisabled(false)
    }, duration.value);
  };

  useEffect(() => {
    if (gameState.length === 3) {
      const [first, second, third] = gameState;
  
      if (first === second && second === third) {
        setTextMessage('Поздравляем, Вы выиграли миллион долларов!');
      } else if (first === second || second === third || first === third) {
        setTextMessage('Совпало два - ты очень близко! Не останавливайся!');    
      } else {
        setTextMessage('Жми еще');
      }
    }
  }, [gameState, bid]);

  const decrement = () => {
    setCurrentCase(currentCase - 1);
    if (currentCase <= 0) {
      setCurrentCase(3)
    }
  };

  const increment = () => {
    setCurrentCase(currentCase + 1);
    if (currentCase >= 3) {
      setCurrentCase(0)
    }
  };

  useEffect(() => {
    switch (currentCase) {
      case 0:
        setBid(50);
        break;
      case 1:
        setBid(100);
        break;
      case 2:
        setBid(150);
        break;
      case 3:
        setBid(200);
        break;
      default:
    }
  }, [currentCase]);

  return (
    <div>
      <div className={s.gambling}>
        <div style={{marginTop: '20px'}}>Ваш баланс: </div>
        <div>{balance}</div>
        <div className={s.gamblingWindows}>
          {gameState.map((el, idx) => (
            <div className={s.gamblingWindowsItem} key={`gamblingWindow${idx}`}>
              <CSSTransition
                in={playAnimation}
                timeout={duration.value}
                classNames='animationItem'
              >
                <div className={s.gamblingWindowsItemList}>
                  {gameData[idx].value.map((itemList, itemIdx) => (
                    <div
                      className={s.gamblingWindowsItemListItem}
                      key={`itemList${itemIdx}`}
                    >
                      {itemList}
                    </div>
                  ))}
                </div>
              </CSSTransition>
              <div key={`gambling${idx}`}>{el}</div>
            </div>
          ))}
        </div>
        <div>
          Ваша ставка:
        </div>
        <div>
          <button className={s.decrement} onClick={decrement}>-</button>{bid}<button className={s.increment} onClick={increment}>+</button>
        </div>
        <div>
          <button style={{marginTop: '20px'}} onClick={handlePlay} disabled={isDisabled}>Play</button>
        </div>
        {showTextMessage && <div>{textMessage}</div>}
      </div>
    </div>
  );
};

export default GameGambling;
