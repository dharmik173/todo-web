import React, { useState, useEffect } from "react";
import { TextField, Button, Checkbox, IconButton, Typography, Box, Menu, MenuItem,ListItemIcon ,Avatar } from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout";
import { Edit, Delete } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { createNewTodo, deleteTodo, editTodo, markCompleteTodo, viewAllTodo } from "../api/todos";
import { logoutUser } from "../api/auth";

const TodoList = ({setAuth}) => {

    const userDetails = JSON.parse(localStorage.getItem("UserState"));

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [editTodoId, setEditTodoId] = useState(null);
    const [editTodoTitle, setEditTodoTitle] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Add a new todo
    const handleAddTodo = async () => {
        if (!newTodo.trim()) return;
    
        try {
            const obj = {
                todoTitle: newTodo,
            };
    
            const newTodoData = await createNewTodo(obj);
            if(newTodoData.status===200){
                setTodos((prevTodos) => [newTodoData.data.newAddedTodoData,...prevTodos ]); // Append the new todo
                setNewTodo("");
            }
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    // Toggle completion
    const handleToggleComplete = async(id) => {
        try {
            const markTodo = await markCompleteTodo(id)
            if(markTodo.status===200){
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo._id === id ? { ...todo, completed: !todo.completed } : todo
                    )
                );
            }
        } catch (error) {
            console.error("something went wrong",error);
        }  
    };



    // Edit a todo
    const handleEditTodo = (id, title) => {
        try {
            setEditTodoId(id);
            setEditTodoTitle(title);
            
        } catch (error) {
            console.error("something went wrong",error)
        }
    };

    const handleSaveEdit = async() => {
        const findTodo = todos.find(item=>item._id===editTodoId)
        // if current title and previous title is same then return true to save API call
        if(findTodo.todoTitle===editTodoTitle){
            setEditTodoId(null);
                setEditTodoTitle("");
                return;
        }
        try {
            const newTitle = 
            {
            newTitle:editTodoTitle
            }
            const todoEdit = await editTodo(editTodoId,newTitle)
            if(todoEdit.status===200){
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo._id === editTodoId ? { ...todo, todoTitle: editTodoTitle } : todo
                    )
                );
                setEditTodoId(null);
                setEditTodoTitle("");
            }else{
                throw new Error("error")
            }
        } catch (error) {
            console.error("something went wrong",error.message)
        }
       
    };

        // Delete a todo
        const handleDeleteTodo = async(id) => {
            try {
                const deleteSelectedTodo = await deleteTodo(id)
                if(deleteSelectedTodo.status===200){
                    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
                }
            } catch (error) {
                console.error("error while deleting todo",error.message)
            }
        };

    

    const handleViewAllTodos = async()=>{
        try {
           const data= await viewAllTodo()
           setTodos(data.data.todoList)
        } catch (error) {
            console.error("something went wrong",error)
        }
    }

    const handleLogout = async()=>{
        try {
            await logoutUser()
                localStorage.removeItem("UserToken")
                setAuth(false)
        } catch (error) {
            console.error("unable to do logout",error)
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            handleViewAllTodos();
        }, 500);
    
        // Cleanup the timeout on component unmount
        return () => clearTimeout(timer);
    }, []);


    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{display:"flex",justifyContent:"space-between",marginBottom:"20px"}}>
            <Typography variant="h4" gutterBottom>
                Todo List
            </Typography>

            <IconButton onClick={handleMenuOpen}>
                <Avatar>
                    <AccountCircleIcon />
                </Avatar>
            </IconButton>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                    elevation: 4,
                    sx: {
                        mt: 1.5,
                        minWidth: 200,
                        "& .MuiMenuItem-root": {
                            gap: 1,
                        },
                    },
                }}
            >
                <MenuItem>
                    <Typography variant="body1">{userDetails.name}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>

            <Box display="flex" gap={2} alignItems="center" marginBottom={4} sx={{justifyContent:"center"}}>
                <TextField
                    label="Add a new todo"
                    variant="outlined"
                    size="small"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={()=>handleAddTodo()}>
                    Add
                </Button>
            </Box>

            {todos.map((todo) => (
                <Box
                    key={todo._id}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: 2,
                        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                        background: todo.completed ? "#e0ffe0" : "#fff",
                    }}
                >
                    <Box display="flex" alignItems="center" gap={2}>
                        <Checkbox
                            checked={todo.completed}
                            onChange={() => handleToggleComplete(todo._id)}
                        />
                        {editTodoId === todo._id ? (
                            <TextField
                                value={editTodoTitle}
                                size="small"
                                onChange={(e) => setEditTodoTitle(e.target.value)}
                            />
                        ) : (
                            <Typography
                                variant="body1"
                                sx={{
                                    textDecoration: todo.completed ? "line-through" : "none",
                                }}
                            >
                                {todo.todoTitle}
                            </Typography>
                        )}
                    </Box>
                    <Box>
                        {editTodoId === todo._id ? (
                            <Button
                                variant="contained"
                                size="small"
                                color="success"
                                onClick={handleSaveEdit}
                            >
                                Save
                            </Button>
                        ) : (
                            <IconButton
                                color="primary"
                                onClick={() => handleEditTodo(todo._id, todo.todoTitle)}
                                disabled={todo.completed}
                            >
                                <Edit />
                            </IconButton>
                        )}
                        <IconButton
                            color="error"
                            onClick={() => handleDeleteTodo(todo._id)}
                        >
                            <Delete />
                        </IconButton>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default TodoList;
