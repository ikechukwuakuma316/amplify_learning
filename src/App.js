import './App.css';
import { DataStore } from '@aws-amplify/datastore';
import { Todo } from './models';

function App() {
  async function deleteItem() {
    const modelToDelete = await DataStore.query(
      Todo, 
      "1fbbae44-4c8a-490f-891c-27229ba2cdfb"
    );
    DataStore.delete(modelToDelete);
  }


  async function update(){
    const original = await DataStore.query(
      Todo, 
      "1fbbae44-4c8a-490f-891c-27229ba2cdfb"
    );

    await DataStore.save(Todo.copyOf(original, item => {
    // Update the values on {item} variable to update DataStore entry
    item.name = `title ${Date.now()}`
}));
  }

  async function showTodos(){
    const models = await DataStore.query(Todo);
    console.log(models);
  }
  

  async function addTodo(){
    await DataStore.save(
      new Todo({
      "name": "Lorem ipsum dolor sit amet",
      "description": "Lorem ipsum dolor sit amet"
    })
  );
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={addTodo}>Add</button>
        <button onClick={showTodos}>Show Todos</button>
        <button onClick={update}>Update</button>
        <button onClick={deleteItem}>Delete</button>
      </header>
    </div>
  );
}

export default App;
