import logo from './logo.svg';
import './App.css';
import MyButton from "./MyButton";
import {useState} from "react";

//Je n'ai pas réussi à faire "map", j'ai donc préféré utiliser l'exemple donné dans la doc.

/*function App() {
     const [notes, setNotes] = useState([]);
     const [newNotes, setNewNotes] = useState('')

    function handleClick(){
        setNotes([...notes, newNotes]);
    }


    function handleAddTodo(title) {
        setnewNotes([...newNotes,{}]);
    }

    console.log(notes);
    return (
        <div className={"app"}>
            <header className={"App-header"}>
                <h1>Liste de tâches</h1>
                <label htmlFor="tache">Ajouter une tâche</label>
                <input onChange={e => setNewNotes(e.target.value)}/>
                <button onClick={handleClick}>Ajouter</button>
                <ul id={"listeTache"}>
                {notes.map(newNotes => (
                <li key={newNotes.id}>
                    <Task newNotes={newNotes} onDelete={onDeletenewNotes}/>
                </li>))}}
                </ul>

            </header>

        </div>
    );
}

export default App;*/

let nextId = 0;
// Déclaration du tableau pour stocker les tâches
const initialTodos = [];

// Fonction générale
function TaskApp() {
    const [todos, setTodos] = useState(initialTodos);

    // fonction ajout dans le tableau
    function handleAddTodo(title) {
        setTodos([
            ...todos,
            {
                id: nextId++,
                title: title,
                done: false
            }
        ]);
    }

    function handleChangeTodo(nextTodo) {
        setTodos(todos.map(t => (t.id === nextTodo.id ? nextTodo : t)));
    }

    // fonction supprimer
    function handleDeleteTodo(todoId) {
        setTodos(todos.filter(t => t.id !== todoId));
    }

    // Génère le visuel (HTML)
    return (
        < div className={"App-header"}>
            <h1>Liste des tâches</h1>
            <AddTodo onAddTodo={handleAddTodo}/>
            <TaskList
                todos={todos}
                onChangeTodo={handleChangeTodo}
                onDeleteTodo={handleDeleteTodo}
            />
        </div>
    );
}

// Cette fonction va permettre d'ajouter une ligne
function AddTodo({ onAddTodo }) {
    const [title, setTitle] = useState('');

    const handleAddClick = () => {
        if (title.trim()) {
            onAddTodo(title);
            setTitle('');
        }
    };

    return (
        <>
            <input placeholder="Saissisez une tâche" value={title} onChange={e => setTitle(e.target.value)}/>
            <button onClick={handleAddClick}>Ajouter</button>
        </>
    );
}


function TaskList({ todos, onDeleteTodo }) {
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                    <Task todo={todo} onDelete={onDeleteTodo}/>
                </li>
            ))}
        </ul>
    );
}

// Cette fonction va permettre d'éditer la tâche stocker dans le tableau (supprimer)
function Task({ todo, onChange, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    let todoContent;

    if (isEditing) {
        todoContent = (
            <>
                <input value={todo.title} onChange={e => {onChange({...todo, title: e.target.value});}}/>
                <button onClick={() => setIsEditing(false)}>Save</button>
            </>
        );
    }
    return (
        <label>
            <input type="checkbox" checked={todo.done} onChange={e => {onChange({...todo, done: e.target.checked});}}/>
            {todoContent}
            <button onClick={() => onDelete(todo.id)}>Supprimer</button>
        </label>
    );
}

export default TaskApp;