import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import "./TodoList.css";

function Todolist() {
    const [todo, setTodo] = useState({ description: '', date: '', priority: '' });
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();

    const columns = [
        { 
            field: "description", 
            sortable: true, 
            filter: true,
            floatingFilter: true,
            rowDrag: true
        },
        { 
            field: "date", 
            sortable: true, 
            filter: true, 
            floatingFilter: true },
        { 
            field: "priority", 
            sortable: true, 
            filter: true,
            floatingFilter: true,
            cellStyle: params => params.value.toLowerCase() === "high" ? { color: 'hotpink', fontWeight: '700' } : { color: 'black' }
        }
    ];

    const inputChanged = (event) => {
        setTodo({ ...todo, [event.target.name]: event.target.value });
    }

    const addTodo = (event) => {
        setTodos([...todos, todo]);
    }

    const deleteTodo = () => {
        try {
            setTodos(todos.filter((_, index) =>
                index != gridRef.current.getSelectedNodes()[0].id));
        }
        catch {
            alert("Select row first");
        }
    };

    return (
        <div>
            <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description} />
            <input type="text" onChange={inputChanged} placeholder="Date" name="date" value={todo.date} />
            <input type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={todo.priority} />
            <button onClick={addTodo}>Add</button>

            <div className="ag-theme-material"
                style={{ height: '500px', width: '100%', margin: 'auto' }} >
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection="single"
                    columnDefs={columns}
                    rowData={todos}
                    animateRows={true}
                    rowDragManaged={true}>
                </AgGridReact>
            </div>
            <button onClick={deleteTodo}>Delete</button>
        </div>
    );
};

export default Todolist;