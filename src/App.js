import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './routes/main/MainPage';
import GamblingPage from './routes/games/GamblingPage';
import BombGamePage from './routes/games/BombGamePage';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exect path='/' element={<MainPage />}/>
          <Route path='/gambling' element={<GamblingPage />}/>
          <Route path='/bombgame' element={<BombGamePage />}/>
        </Routes>      
      </BrowserRouter>   
    </div>
  );
}

export default App;
