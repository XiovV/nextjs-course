function Todo(props) {
  return (
    <div className="card">
      <h2>{props.title}</h2>
      <div className="actions">
        <button className="btn">Delete</button>
      </div>
    </div>
  );
}

export default Todo;
