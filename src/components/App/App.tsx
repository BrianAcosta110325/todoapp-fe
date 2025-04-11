import React from 'react';
import Filter from '../Filter/Filter';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTodo from '../CreateTodo/CreateTodo';
import List from '../List/List';

function App() {
  return (
    <div>
      <Filter />
      <CreateTodo />
      <List />
    </div>
  );
}

export default App;