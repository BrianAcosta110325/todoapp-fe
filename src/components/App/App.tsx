import React, { useEffect, useState } from 'react';
import Filter from '../Filter/Filter';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTodo from '../CreateTodo/CreateTodo';
import List from '../List/List';
import { Api } from '../../services/Api';
import { Todo } from '../../interfaces/Todo';
import { QueryParams } from '../../interfaces/QueryParams';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  // Pagination
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // Filter
  const [filterParams, setFilterParams] = useState<QueryParams>({ text: '' });
  // Metrics
  const [metrics, setMetrics] = useState({
    averageTimeDifference: '',
    averageLowTimeDifference: '',
    averageMediumTimeDifference: '',
    averageHighTimeDifference: '',
  });

  const applyFilter = () => {
    const queryParams: QueryParams = {
      page: page.toString(),
      text: filterParams.text,
    };

    if (filterParams.completed) {
      queryParams.completed = filterParams.completed;
    }

    if (filterParams.priorities) {
      queryParams.priorities = filterParams.priorities;
    }

    Api.get('todos', queryParams).then((response) => {
      setTodos(response.data);
      setTotalPages(response.totalPages);
      setMetrics({
        averageTimeDifference: response.averageTimeDifference,
        averageLowTimeDifference: response.averageLowTimeDifference,
        averageMediumTimeDifference: response.averageMediumTimeDifference,
        averageHighTimeDifference: response.averageHighTimeDifference,
      });
    });
  };

  // Reaplica el filtro cada vez que cambie la página
  useEffect(() => {
    applyFilter();
  }, [page]);

  return (
    <div>
      <Filter
        onApplyFilter={(params) => {
          setFilterParams(params);
          setPage(0); // Reinicia a la página 0 cuando se aplica un nuevo filtro
        }}
      />
      <CreateTodo />
      <List
        todos={todos}
        setTodos={setTodos}
        pagination={{ page, setPage, totalPages }}
      />
    </div>
  );
}

export default App;