import { Tabs, Tab } from '@mui/material';
import React, { useState, useRef } from 'react';
import Todolist from './TodoList';
import Home from './Home';

export default function TabApp() {
    const [value, setValue] = useState('home');

    const handleChange = (event, value) => {
        setValue(value);
    }

    return (
    <div>
        <Tabs value={value} onChange={handleChange}>
            <Tab value="home" label="Home" />
            <Tab value="todo" label="ToDoList" />
        </Tabs>
        {value == "home" && <Home />}
        {value == "todo" && <Todolist />}
    </div>
    );
}