import React, { useEffect, useState } from 'react';
import Filter from '../Filter/Filter';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTodo from '../CreateTodo/CreateTodo';
import List from '../List/List';
import { Todo } from '../../interfaces/Todo';
import { QueryParams } from '../../interfaces/QueryParams';
import Metrics from '../Metrics/Metrics';
import { TodoService } from '../../services/TodoService';

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

  const applyFilter = React.useCallback(() => {
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

    TodoService.getTodos(queryParams).then((response) => {
      setTodos(response.data);
      setTotalPages(response.totalPages);
      setMetrics({
        averageTimeDifference: response.averageTimeDifference,
        averageLowTimeDifference: response.averageLowTimeDifference,
        averageMediumTimeDifference: response.averageMediumTimeDifference,
        averageHighTimeDifference: response.averageHighTimeDifference,
      });
    });
  }, [page, filterParams]);

  // Reapply the filter whenever the page changes
  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  return (
    <div>
      <Filter
        onApplyFilter={(params) => {
          setFilterParams(params);
          setPage(0);
        }}
      />
      <CreateTodo 
        onCreateTodo={() => {
          applyFilter();
        }}
      />
      <List
        onEditTodo={() => {
          applyFilter();
        }}
        todos={todos}
        setTodos={setTodos}
        pagination={{ page, setPage, totalPages }}
      />
      <Metrics 
        averageTimeDifference={metrics.averageTimeDifference}
        averageLowTimeDifference={metrics.averageLowTimeDifference}
        averageMediumTimeDifference={metrics.averageMediumTimeDifference}
        averageHighTimeDifference={metrics.averageHighTimeDifference}
      />
    </div>
  );
}

export default App;