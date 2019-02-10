import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from  '../components/ErrorBoundary';
import './App.css';

/* 
SearchBox needs to communicate with CardList.
CardList also needs to know what's in SearchBox so that it can filter the robots.
Both components need to send their information to App
so that it can tell them what to do. For this we need state.

App has two states - robots and searchfield
and because App owns the state, any component that has state
uses the class syntax so they can use the constructor function to
create this.state and this.state is what changes in App.
It is what describes the App. 

State usually lives in the parent component that
passes state to different components. 
*/
class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: '' 
        }
    }


// After component is mounted, fetch is used to get the user information
// which is turned into json format and the users are put into the robots state.
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {this.setState({ robots: users })}); // 
    }

/* Remember to use the arrow syntax when it's not a part of React!! */
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return !robots.length ?
            <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
    }
}

export default App;