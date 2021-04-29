const List = ({items}) => {
  if (items.length === 0) {
    return <small>Nothing to see here</small>;
  }

  return <ul v-for={items}>
    {(item) => <li>
        <input
          type="checkbox"
          hx-patch={`/todo/update/${item.id}`}
          hx-target="#list"
          checked={item.done} />
        <strike v-escape={item.title} v-if={item.done} />
        <span v-escape={item.title} v-unless={item.done} />
        <button hx-delete={`/todo/remove/${item.id}`} hx-target="#list">x</button>
      </li>
    }
  </ul>;
};

export default List;