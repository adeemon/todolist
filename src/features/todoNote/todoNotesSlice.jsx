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
                files: ['3x.png', '1x.png']
            },
            {
                id: 2,
                date: '2024-04-13 19:18',
                title: 'kekwaitof',
                status: true,
                body: 'lololol',
                isFullMode: false,
                files: []
            }
        ],
        isCreating: false,
    },
    reducers: {
        addTodo: (state, action) => {
            action.payload.id = _getId(state);
            action.payload.isFullMode = false;
            state.todos.unshift(action.payload);
            state.isCreating = false;
        },
        updateTodo: (state, action) => {
            let buf = produce(state.todos, draft => {
                let todoToChange = draft.find((todo) => todo.id === action.payload.id);
                todoToChange.id = action.payload.id;
                todoToChange.title = action.payload.title;
                todoToChange.body = action.payload.body;
                todoToChange.status = action.payload.status;
                todoToChange.date = action.payload.date;
                todoToChange.isFullMode = false;
            });
            state.todos = buf;
            state.isCreating = false;
        },
        removeTodo: (state, action) => {
            const newTodos = _removeTodo(action.payload.id, state);
            state.todos = newTodos;
        },
        toggleMode: (state, action) => {
            state.todos = produce(state.todos, draft => {
                let todoToChange = draft.find((todo) => todo.id === action.payload.id);
                todoToChange.status = !todoToChange.status;
            });
        },
        toggleFullMode: (state, action) => {
            const isClosed = false;
            state.todos = produce(state.todos, draft => {
                let todoToChange = draft.find((todo) => todo.id === action.payload);
                todoToChange.isFullMode = !todoToChange.isFullMode;
            });
        },
        toggleCreatingWindow: (state) => {
            state.isCreating = !state.isCreating;
        }
    }
});

const _removeTodo = (id, state) => {
    let output = current(state.todos).filter((todo) => {
        return todo.id !== id;
    })
    return output;
}

const _setAllTodoToShort = (state) => {
    produce(state.todos, draft => {
        draft.forEach(element => {
            element.isFullMode = false;
        });
    })
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

export const { addTodo, removeTodo, 
    toggleMode, toggleCreatingWindow,
    toggleFullMode, updateTodo} = todoNotesSlice.actions;

export default todoNotesSlice.reducer;