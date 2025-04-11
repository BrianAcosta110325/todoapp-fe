import React from 'react';
import Filter from '../Filter/Filter';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTodo from '../CreateTodo/CreateTodo';

function App() {
  return (
    <div>
      <Filter />
      <CreateTodo />
    </div>
  );
}

export default App;