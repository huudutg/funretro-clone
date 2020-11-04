import React from 'react';
import './sass/style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
} from "react-router-dom";
import Board from './components/Board/Board.js';
import DashBoard from './components/Home/Dashboard.js'
import ProtectUser from './ProtectUser';
import OAuth from './components/OAuth/OAuth';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <Router>
      <div className="App">

        <Switch>
          <Route path="/login">
            <OAuth />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/register">
            <OAuth />
          </Route>
          <ProtectUser>
            <Route path="/dashboard">
              <h1>
                login
            </h1>
            </Route>
            <Route path="/board/:id">
              <Board />
            </Route>
            <Route exact path="/">
              <DashBoard />
            </Route>
          </ProtectUser>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
