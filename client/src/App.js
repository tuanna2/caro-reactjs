import React from 'react';
import { BrowserRouter as Router, Route , Switch } from "react-router-dom";
import 'App.css';
import Form from 'Form.js';
import Board from 'Board.js';
import Info from 'Info.js';


class App extends React.Component {
  render() {
    return (
        <Router>
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <Switch>
                        <Route path="/" exact component={Form} />
                        <Route path="/room" component={Info} />
                        <Route component={Form} />
                    </Switch>
                </div>
            </div>
        </Router>   
    );
  }
}


export default App;
