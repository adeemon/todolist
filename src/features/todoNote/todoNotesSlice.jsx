import { createSlice, current } from "@reduxjs/toolkit";
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
            let newTodos = current(state.todos).filter((todo) => {
                return todo.id !== action.payload.id;
            });
            state.todos = newTodos;
        },
        toggleStatus: (state, action) => {
            console.log(state);
        },
        openCreatingWindow: (state, action) => {
            state.isCreating = true;
            console.log(current(state));
        }
    }
});

export const selectAllTodos = (state) => {
    return state.todoNotes.todos;
}

export const selectIsCreating = (state) => {
    return state.todoNotes.isCreating;
}

export const getEmptyTodo = () => {
    return emptyTodo;
}

export const { addTodo, removeTodo, toggleStatus, openCreatingWindow } = todoNotesSlice.actions;

export default todoNotesSlice.reducer;