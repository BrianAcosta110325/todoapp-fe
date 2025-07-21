import React, { useEffect, useState } from 'react';
import Filter from '../Filter/Filter';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateTodo from '../CreateTodo/CreateTodo';
import List from '../List/List';
import { Todo } from '../../Interfaces/Todo';
import { QueryParams } from '../../Interfaces/QueryParams';
import Metrics from '../Metrics/Metrics';
import { TodoService } from '../../Services/TodoService';
import LoadingScreen from '../../Utils/LoadingScreen';
import { buildQueryParams } from '../../Utils/QueryHelper';

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

  // Loading state
  const [loading, setLoading] = useState(true);

  const applyFilter = React.useCallback(() => {
    setLoading(true);
  
    const queryParams = buildQueryParams({
      ...filterParams,
      page: page.toString() 
    });
  
    TodoService.getTodos(queryParams).then((response) => {
      setTodos(response.data);
      setTotalPages(response.totalPages);
      setMetrics({
        averageTimeDifference: response.averageTimeDifference,
        averageLowTimeDifference: response.averageLowTimeDifference,
        averageMediumTimeDifference: response.averageMediumTimeDifference,
        averageHighTimeDifference: response.averageHighTimeDifference,
      });

      setTimeout(() => {
        setLoading(false);
      }, 200);
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
          setFilterParams((prev) => ({
            ...prev,
            text: params.text,
            completed: params.completed,
            priorities: params.priorities,
          }));
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
        pagination={{ page, setPage, totalPages }}
        onApplySort={(params) => {
          setFilterParams((prev) => ({
            ...prev,
            prioritySort: params.get('priority'),
            dueDateSort: params.get('dueDate'),
          }));
        }}
      />
      <Metrics 
        averageTimeDifference={metrics.averageTimeDifference}
        averageLowTimeDifference={metrics.averageLowTimeDifference}
        averageMediumTimeDifference={metrics.averageMediumTimeDifference}
        averageHighTimeDifference={metrics.averageHighTimeDifference}
      />
      <LoadingScreen loading={loading} />
    </div>
  );
}

export default App;