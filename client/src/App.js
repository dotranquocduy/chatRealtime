import './App.css';

import { Route, Router } from 'react-router';
import chat from './components/chat/chat';
import join from './components/join/join';
const App = () =>{
  return (
    <Router>
      <Route path='/' exact Component={chat} />
      <Route path='/chat'  Component={join}/>
    </Router>
  );
}
export default App;
