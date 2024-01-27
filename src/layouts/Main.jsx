import React from 'react';
import MainHeader from './Main/MainHeader';

const Main = ({
    children
}) => {
    return (
        <div>
            <div>
                <MainHeader />
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}

export default Main;

