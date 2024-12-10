//THIS IS THE INITIAL CODE WHICH WORKS BUT IS VERY LONG SO WE BREAK IT INTO COMPONENTS 
//     THAT BROKEN COMPONENTS CODE IS THEN DIVIDED INTO DIFF JSX FILES


import { useState } from "react"
import "./styles.css"

export default function App() {
    const [newItem, setNewItem] = useState("") //default value of state is ""
    const [todos, setTodos] = useState([])

    //setNewItems and setTodos in below code show two ways how we can update value of state

    function handleSubmit(e) {
        e.preventDefault() //prevents inp data from erasure when clicks enter

        //CANT DO IT THIS WAY BCOZ IF I REPEAT THIS AGAIN AGAIN IT WOULD ONLY CREATE SINGLE ARRAY TILL THE END AND OVERRIDE PREV ARRAYS
        //TO UPDATE THIS WE NEED TO PASS A FUNCTION TO THIS
        // setTodos([...todos,
        //   { id: crypto.randomUUID(), title: newItem, 
        //     completed: false},
        //  ])

        //AS WE CAN NOT UPDATE TODOS SO WE USE ARRAY DESTRUCTURING [...todos] this just copies todos value so basically its a new array not todos

        //THIS CAN ADD 2 OR MORE VALUES TO ARRAY INSTEAD OF JUST 1 IF WE COPY PASTE THIS SETTODOS CODE SEGMENT AGAIN AND AGAIN
        setTodos((currentTodos) => {
            return [
                ...todos,
                {
                    id: crypto.randomUUID(), title: newItem,
                    completed: false
                },
            ]
        })

        setNewItem("") //clears out input area whenever we hit enter
    }

    function toggleTodo(id, completed) {
        setTodos(currentTodos => {
            return currentTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed } //we need to do this object destructuring everytime bcoz we cannot diretly change value of state
                }

                return todo
            })
        })
    }

    function deleteTodo(id) {
        setTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id !== id)
        })
    }

    //everytime we change a states value it rerenders whole return element
    return (
        <>
            <form onSubmit={handleSubmit} className="new-item-form">
                <div className="form-row">
                    <label htmlFor="item">New Item</label>
                    <input
                        value={newItem}   //only way to change state's value is by using setNewItem
                        onChange={e => setNewItem(e.target.value)}  //onchange runs everytime we click enter on input
                        type="text"
                        id="item"
                    />
                </div>
                <button className="btn">Add</button>
            </form>
            <h1 className="header">Todo List</h1>
            <ul className="list">
                {todos.length === 0 && "NoTodos"}
                {todos.map(todo => {
                    return (
                        <li key={todo.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={e => toggleTodo(todo.id, e.target.checked)}
                                />
                                {todo.title}
                            </label>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="btn btn-danger"
                            >
                                Delete
                            </button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
