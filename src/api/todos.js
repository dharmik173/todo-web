import { api } from "./axios";

// API TO FETCH ALL TODO OF USER
export const viewAllTodo = async () => {
    try {
        const response = await api.get("/todo/viewAll",);
        return response;
    } catch (error) {
        console.error("Error fetching todo:", error.response?.data || error.message);
        throw error.response?.data || { message: "unable to fetch data" };
    }
};

// API TO CREATE NEW TODO OF USER
export const createNewTodo = async (todoTitle) => {
    try {
        const response = await api.post("/todo/create",todoTitle);
        return response;
    } catch (error) {
        console.error("Error creating todo:", error.response?.data || error.message);
        throw error.response?.data || { message: "unable to create todo" };
    }
};

// API TO FETCH EDIT TODO OF USER
export const editTodo = async (todoId,newTitle) => {
    try {
        const response = await api.put(`/todo/edit/${todoId}`,newTitle);
        return response;
    } catch (error) {
        console.error("Error editing todo:", error.response?.data || error.message);
        throw error.response?.data || { message: "unable to edit todo" };
    }
};

// API TO MARK COMPLETE TODO OF USER
export const markCompleteTodo = async (todoId) => {
    try {
        const response = await api.put(`/todo/markComplete/${todoId}`);
        console.log('response: ', response);
        return response;
    } catch (error) {
        console.error("Error mark completing todo:", error.response?.data || error.message);
        throw error.response?.data || { message: "unable to mark complete todo" };
    }
};


// API TO DELETE TODO OF USER
export const deleteTodo= async (todoId) => {
    try {
        const response = await api.delete(`/todo/delete/${todoId}`);
        return response;
    } catch (error) {
        console.error("Error deleting todo:", error.response?.data || error.message);
        throw error.response?.data || { message: "unable to delete todo" };
    }
};