import Form from '../components/Form/Form';
import TodoList from '../components/TodoList/TodoList';
import Text from '../components/Text/Text';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import EditForm from '../components/EditForm/EditForm';
import FilterTodos from '../components/FilterTodos/FilterTodos';

const Todos = () => {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem('my-todos')) ?? [];
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    localStorage.setItem('my-todos', JSON.stringify(todos));
  });

  const addTodo = text => {
    setTodos(prev => [...prev, { text, id: nanoid() }]);
  };

  const deleteTodo = id => {
    setTodos(prev => prev.filter(item => item.id !== id));
  };

  const handelEditTodo = ({ id, text }) => {
    setCurrentTodo({ id, text });
    setIsEditing(true);
  };

  const fintTodo = text => {
    return todos.some(todo => todo.text.toLowerCase() === text.toLowerCase());
  };

  const updateTodo = (id, newText) => {
    const currentTodo = todos.find(todo => todo.id === id);

    if (currentTodo.text.toLowerCase() === newText.toLowerCase()) {
      setTodos(prev =>
        prev.map(item => (item.id === id ? { ...item, text: newText } : item)),
      );

      setCurrentTodo({});
      setIsEditing(false);
      return;
    }

    if (fintTodo(newText)) {
      alert('This task already exists');
      return;
    }

    setTodos(prev =>
      prev.map(item => (item.id === id ? { ...item, text: newText } : item)),
    );
    setCurrentTodo({});
    setIsEditing(false);
  };

  const cancelUpdate = () => {
    setCurrentTodo({ currentTodo });
    setIsEditing(false);
  };

  const filteredTodos = (todos, filterValue) => {
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(filterValue.toLowerCase()),
    );
  };

  return (
    <>
      {isEditing ? (
        <EditForm
          updateTodo={updateTodo}
          cancelUpdate={cancelUpdate}
          defaultValue={currentTodo}
        />
      ) : (
        <Form onSubmit={addTodo} />
      )}

      <FilterTodos value={filterValue} onChangeValue={setFilterValue} />

      {todos.length === 0 ? (
        <Text textAlign="center">There are no todos...</Text>
      ) : (
        <>
          {filteredTodos(todos, filterValue).length === 0 ? (
            <Text textAlign="center">No todos found...</Text>
          ) : (
            <TodoList
              todos={filteredTodos(todos, filterValue)}
              onDelete={deleteTodo}
              handelEditTodo={handelEditTodo}
            />
          )}
        </>
      )}
    </>
  );
};

export default Todos;
