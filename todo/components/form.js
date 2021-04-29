const Form = () => <form
  hx-post="/todo/add"
  hx-target="#list"
  _="on submit put '' into #todoField.value">
  <input id="todoField" type="text" name="todo" placeholder="Todo title..." />
  <button type="text">Add</button>
</form>;

export default Form;