import { createSlice, current } from "@reduxjs/toolkit";
import produce from "immer"
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
                title: 'kekwait',
                status: false,
                body: 'lololol',
                isFullMode: false,
            },
            {
                id: 2,
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
            state.todos.push(action.payload);
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
            console.log(current(state));
        },
        toggleMode: (state, action) => {
            state.todos = produce(state.todos, draft => {
                let todoToChange = draft.find((todo) => todo.id === action.payload.id);
                todoToChange.status = !todoToChange.status;
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




export const selectAllTodos = (state) => {
    return state.todoNotes.todos;
}

export const selectIsCreating = (state) => {
    return state.todoNotes.isCreating;
}

export const getEmptyTodo = () => {
    return emptyTodo;
}

export const { addTodo, removeTodo, toggleStatus, openCreatingWindow, toggleMode} = todoNotesSlice.actions;

export default todoNotesSlice.reducer;