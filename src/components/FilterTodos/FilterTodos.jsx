const FilterTodos = ({ value, onChangeValue }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChangeValue(e.target.value)}
      placeholder="Find any todo"
      name="filter"
    />
  );
};

export default FilterTodos;
