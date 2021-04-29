import Form from "./form";
import List from "./list";

const TodoList = {
  todoListItems: [],
  id: 0,
  getNextId(){
    this.id++;
    return this.id;
  },
  addTodo({title}){
    this.todoListItems.push({id: this.getNextId(), title, done: false});
  },
  removeTodo(id){
    this.todoListItems = this.todoListItems.filter((item) => `${item.id}` !== id);
  },
  toggleTodo(id){
    this.todoListItems = this.todoListItems.map((item) => {
      if (`${item.id}` === id) {
        item.done = !item.done;
      }
  
      return item;
    });
  },
  List(){
    return <List items={TodoList.todoListItems} />
  },
  view(){
    return <div>
      <section id="list">
        <TodoList.List />
      </section>
      <Form />
    </div>;
  }
};

export default TodoList;
