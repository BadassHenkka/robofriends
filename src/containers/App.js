import React, { useState } from "react";

import { useQuery } from "react-query";

import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css";

// Fetch the "user" information
const fetchRobots = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      return users;
    })
    .catch((err) => {
      throw new Error(err);
    });
  return data;
};

const App = () => {
  const { data: robots, isLoading, isError, error } = useQuery(
    "fetchRobots",
    fetchRobots
  );
  const [searchfield, setSearchfield] = useState("");

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };
  const filteredRobots =
    !isLoading &&
    robots &&
    robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (isError) {
    return (
      <div>
        <h1>There was an error while fetching robots</h1>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
};

export default App;
