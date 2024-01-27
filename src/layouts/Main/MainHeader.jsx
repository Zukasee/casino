import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainHeader = () => {
    const menuData = [
        {
            title: 'Главная',
            route: '/'
        },
        {
            title: 'Gambling 777',
            route: '/gambling'
        },
        {
            title: 'Bomb Game',
            route: '/bombgame'
        }
    ]
    const navigate = useNavigate()
    const handleRoute = (route) => {
        navigate(route)
    }   
    return (
        <div>
            {menuData.map((el, idx) => <div onClick={() => handleRoute(el.route)} key={`menu${idx}`}>{el.title}</div>)}
        </div>
    );
}

export default MainHeader;
