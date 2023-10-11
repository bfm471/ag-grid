import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import "./TodoList.css";
import { Button, TextField, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';


function Todolist() {
    const [todo, setTodo] = useState({ description: '', date: '', priority: '' });
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();
    // const [date, setDate] = useState<Dayjs | null>(null);

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
    };

    const addTodo = (event) => {
        setTodos([...todos, todo]);
    };

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
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <TextField onChange={inputChanged} label="Description" variant="standard" name="description" value={todo.description} />
                {/* <DatePicker value={date} onChange={date => yourChangeDateFunc(date)} /> */}
                <TextField onChange={inputChanged} label="Date" variant='standard' name="date" value={todo.date} />
                <TextField onChange={inputChanged} label="Priority" variant='standard' name="priority" value={todo.priority} />
                <Button onClick={addTodo} size='small' color='success' variant='contained'>Add</Button>
                <Button onClick={deleteTodo} size='small' color='error' variant='outlined'>Delete</Button>
            </Stack>

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
        </div>
    );
};

export default Todolist;