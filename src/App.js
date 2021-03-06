import { useState, useEffect } from 'react';
import axios from "axios";
import { format } from 'date-fns';
import './App.css';
import Item from './Components/Item'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

function App() {

  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [isUpdating, setUpdating] = useState("");
  const [selected, setSelected] = useState("");
 

  useEffect(() => {
    axios.get("http://localhost:5000/get-todo")
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err));
  })

  const addUpdateTodo = () => {

    if (isUpdating === "") {
      axios.post("http://localhost:5000/save-todo", { text })
        .then((res) => {
          console.log(res.data);
          setText("");
        })
        .catch((err) => console.log(err));
    }else{
      axios.post("http://localhost:5000/update-todo", { _id: isUpdating, text })
        .then((res) => {
          console.log(res.data);
          setText("");
          setUpdating("");
        })
        .catch((err) => console.log(err));
    }
  }

  const deleteTodo = (_id) => {
    axios.post("http://localhost:5000/delete-todo", { _id })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  const updateTodo = (_id, text) => {
    setUpdating(_id);
    setText(text);
  }

  return (
    <div>
      <div className="container">
        <h1 className='text-4xl font-bold mt-16 mb-8'>ToDo App</h1>
        <div className="top">
          <input
            type="text"
            placeholder='Write Something...'
            value={text}
            onChange={(e) => setText(e.target.value)} />
          <div className="add"
            onClick={addUpdateTodo}>{isUpdating ? "Update" : "Add"}</div>
        </div>

        <div className="list">
          {todo.map(item => <Item
            key={item._id}
            text={item.text}
            remove={() => deleteTodo(item._id)}
            update={() => updateTodo(item._id, item.text)} />)}
        </div>
        <div>
          <h1 className='text-4xl font-bold mt-16 mb-8'>Calendar</h1>
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                    
                    />
                </div>
      </div>
    </div>
  );
}

export default App;