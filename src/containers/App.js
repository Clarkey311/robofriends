import React, { Component } from 'react';
import {connect } from 'react-redux';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox.js';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

import { setSearchField, requestRobots } from'../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {

    componentDidMount(){
        //console.log(this.props.store.getState())
        this.props.onRequestRobots()
;    }

   
    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })

        if (isPending){
            return <h1>Loading...</h1>
        }else{
            return (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);