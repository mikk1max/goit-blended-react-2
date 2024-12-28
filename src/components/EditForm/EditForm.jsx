import { RiSaveLine } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import style from './EditForm.module.css';

const EditForm = ({ updateTodo, cancelUpdate, defaultValue }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const textValue = e.target.elements.text.value;
    updateTodo(defaultValue.id, textValue);

    e.target.reset();
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.submitButton} type="submit">
        <RiSaveLine color="green" size="16px" />
      </button>

      <button className={style.editButton} type="button" onClick={cancelUpdate}>
        <MdOutlineCancel color="red" size="16px" />
      </button>

      <input
        className={style.input}
        defaultValue={defaultValue.text}
        placeholder="What do you want to write?"
        name="text"
        required
        autoFocus
      />
    </form>
  );
};

export default EditForm;
