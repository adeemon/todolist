import { createSlice, current } from "@reduxjs/toolkit";
import produce from "immer"
import dayjs from 'dayjs'

const emptyTodo = {
    id: 0,
    title: '',
    status: 'false',
    body: '',
    isFullMode: 'true'
}

export const todoNotesSlice = createSlice({
    name: 'todoNotes',
    initialState: {
        todos: [{
                id: 1,
                date: '2018-04-13 19:18',
                title: 'kekwait',
                status: false,
                body: 'lololol',
                isFullMode: false,
            },
            {
                id: 2,
                date: '2024-04-13 19:18',
                title: 'kekwaitof',
                status: true,
                body: 'lololol',
                isFullMode: false,
            }
        ],
        isCreating: false,
    },
    reducers: {
        addTodo: (state, action) => {
            action.payload.id = _getId(state);
            action.payload.isFullMode = false;
            console.log(action.payload);
            state.todos.unshift(action.payload);
            state.isCreating = false;
        },
        removeTodo: (state, action) => {
            const newTodos = _removeTodo(action.payload.id, state);
            state.todos = newTodos;
        },
        toggleStatus: (state, action) => {
            console.log(state);
        },
        openCreatingWindow: (state, action) => {
            state.isCreating = true;
        },
        closeCreatingWindow: (state) => {
            state.isCreating = false;
        },
        toggleMode: (state, action) => {
            state.todos = produce(state.todos, draft => {
                let todoToChange = draft.find((todo) => todo.id === action.payload.id);
                todoToChange.status = !todoToChange.status;
            });
        },
        toggleFullMode: (state, action) => {
            state.todos = produce(state.todos, draft => {
                let todoToChange = draft.find((todo) => todo.id === action.payload);
                todoToChange.isFullMode = !todoToChange.isFullMode;
            });
        }

    }
});

const _removeTodo = (id, state) => {
    let output = current(state.todos).filter((todo) => {
        return todo.id !== id;
    })
    return output;
}

const _getId = (state) => {
    return current(state.todos).length + 1;
}

export const selectAllTodos = (state) => {
    return state.todoNotes.todos;
}

export const selectIsCreating = (state) => {
    return state.todoNotes.isCreating;
}

export const getEmptyTodo = () => {
    return emptyTodo;
}

export const { addTodo, removeTodo, toggleStatus, openCreatingWindow, 
    toggleMode, closeCreatingWindow, 
    toggleFullMode} = todoNotesSlice.actions;

export default todoNotesSlice.reducer;