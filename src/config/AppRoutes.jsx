import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import App from '../App';
import ChatPage from '../components/ChatPage';
const AppRoutes = () => {
  return (
   
      <Routes>
        <Route path='/' element={<App/>}  />
        <Route path="/chat" element={<ChatPage/>}/>

      </Routes>
   
  )
}

export default AppRoutes;
