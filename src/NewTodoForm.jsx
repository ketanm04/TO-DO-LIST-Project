import { useState } from "react"

export function NewTodoForm({ onSubmit }) {
    const [newItem, setNewItem] = useState("") //default value of state is ""

    function handleSubmit(e) {
        e.preventDefault() //prevents inp data from erasure when clicks enter
        if (newItem === "") return

        onSubmit(newItem)

        setNewItem("") //clears out input area whenever we hit enter
    }


    return (
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
    )
}