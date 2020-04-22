import React, { Component } from 'react';
import { robots } from '../robots';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox.js';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchField: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> response.json())
            .then(users => {this.setState({robots: users})});
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value});
        //console.log(event.target.value);
        
        //console.log(filteredRobots);

    }
    render() {
        const { robots, searchField } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })

        if (!robots.length){
            return <h1>Loading...</h1>
        }else{
            return (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <ErrorBoundry>
                        <Scroll>
                            <CardList robots={filteredRobots}/>
                        </Scroll>
                    </ErrorBoundry>
                </div>
            )
        }
    }
}

export default App;