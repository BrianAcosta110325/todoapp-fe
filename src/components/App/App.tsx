import React, { useEffect, useState } from 'react';
import Filter from '../Filter/Filter';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTodo from '../CreateTodo/CreateTodo';
import List from '../List/List';
import { Api } from '../../services/Api';
import { Todo } from '../../interfaces/Todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load initial todos
  useEffect(() => {
    Api.get('todos').then(response => {
      setTodos(response); // o como sea que estés usando Axios o Fetch
    });
  }, []);

  // Handle filtered todos
  const handleFilteredTodos = (filteredData: Todo[]) => {
    setTodos(filteredData);
  };

  return (
    <div>
      <Filter onApplyFilter={handleFilteredTodos} />
      <CreateTodo />
      <List todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;