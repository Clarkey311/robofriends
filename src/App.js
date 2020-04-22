import React, { Component } from 'react';
import { robots } from './robots';
import CardList from './CardList.js';
import SearchBox from './SearchBox.js';
import './App.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: robots,
            searchField: ''
        }
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value});
        //console.log(event.target.value);
        
        //console.log(filteredRobots);

    }
    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase());
        })
        return (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <CardList robots={filteredRobots}/>
            </div>
        )
    }
}

export default App;