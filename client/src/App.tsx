import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import NavbarLayout from './layout/NavbarLayout';
import MainPage from './Pages/MainPageMessage/MainPages';
import SendedMessages from './Pages/SendedMessages/SendedMessages';
import InputNamePage from './Pages/InputNamePage/InputNamePage';
import GreetingPage from './Pages/GreetingPage/GreetingPage';

function App() { 
  return (
    <div>
      <BrowserRouter>
      <NavbarLayout>
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/hello' element={<InputNamePage/>}/>
            <Route path='/sended' element={<SendedMessages/>}/>
            <Route path='/greeting' element={<GreetingPage/>}/>
          </Routes>
          </NavbarLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
