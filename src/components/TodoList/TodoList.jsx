import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';
import TodoListItem from '../TodoListItem/TodoListItem';

const TodoList = ({ todos, onDelete, handelEditTodo }) => {
  return (
    <Grid>
      {todos.map(({ text, id }, i) => (
        <GridItem key={id}>
          <TodoListItem
            id={id}
            onDelete={onDelete}
            text={text}
            index={i + 1}
            handelEditTodo={handelEditTodo}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

export default TodoList;
