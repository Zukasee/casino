import React from 'react';
import Main from '../../layouts/Main';
import BombGame from '../../widgets/games/bombGame/BombGame';

const BombGamePage = () => {
    return (
        <div>
            <Main>
                <BombGame />
            </Main>
        </div>
    );
}

export default BombGamePage;
