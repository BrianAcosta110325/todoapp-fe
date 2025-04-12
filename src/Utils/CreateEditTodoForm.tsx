import { Todo } from "../interfaces/Todo";

interface TodoFormProps {
  setIsFormVisible: (isVisible: boolean) => void;
  todo: Todo;
  setTodo: (todo: Todo) => void;
  title: string;
  submitForm: () => void;
}

function TodoForm({ setIsFormVisible, todo, setTodo, title, submitForm }: TodoFormProps) {
  // Data for priorities
  const priorities = [
    "High",
    "Medium",
    "Low",
  ]

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={() => setIsFormVisible(false)}></button>
          </div>
          <div className="modal-body">
            <form>
              {/* Text Input */}
              <div className="d-flex align-items-center mb-3">
                <label htmlFor="text" className="form-label me-2 mb-0" style={{ width: '100px' }}>Name</label>
                <input
                  type="text"
                  id="text"
                  className="form-control flex-grow-1"
                  value={todo.text}
                  onChange={(e) => setTodo({ ...todo, text: e.target.value })}
                />
              </div>

              {/* Priorities */}
              <div className="d-flex align-items-center mb-3">
                <label htmlFor="priority" className="form-label me-2 mb-0" style={{ width: '100px' }}>Priority</label>
                <select
                className="form-select"
                value={todo.priority}
                onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
                >
                  {priorities.map((p) => (
                    <option key={p} value={p}>
                    {p}
                    </option>
                  ))}
                </select>
              </div>
              {/* Due Date */}
              <div className="d-flex align-items-center mb-3">
                <label htmlFor="dueDate" className="form-label me-2 mb-0" style={{ width: '100px' }}>Due Date</label>
                <input
                  type="date"
                  id="dueDate"
                  className="form-control flex-grow-1"
                  value={todo.dueDate}
                  onChange={(e) => setTodo({ ...todo, dueDate: e.target.value })}
                />
              </div>
              <div className="d-flex justify-content-end">
                <button 
                  type="submit" 
                  className="btn btn-primary justify-content-end" 
                  onClick={() => {
                    submitForm();
                  }}
                >
                  {title === "Create Todo" ? "Create" : "Edit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoForm;