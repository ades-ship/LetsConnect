import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import JoinCreateRoom from './components/JoinCreateRoom';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoinCreateRoom/>}/>
        <Route path="/chat" element={<ChatPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
