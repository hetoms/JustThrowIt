import React, {Component} from 'react';
import './App.css';
import NavigationBar from "../navigation/NavigationBar";
import Router from "../router/Router";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationBar/>
        <Router/>
      </div>
    );
  }
}

export default App;
