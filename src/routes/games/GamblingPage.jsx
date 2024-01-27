import React from 'react';
import Main from '../../layouts/Main';
import GamblingView from '../../views/games/GamblingView';

const GamblingPage = () => {
    return (
        <div>
            <Main>
                <GamblingView />
            </Main>
        </div>
    );
}

export default GamblingPage;
