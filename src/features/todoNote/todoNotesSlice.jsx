import { createSlice, current } from "@reduxjs/toolkit";
import produce from "immer"
import dayjs from 'dayjs'
import { firebase } from "../../firebase/firebase";
import { getStorage, listAll, ref, uploadBytes } from "firebase/storage";

export const emptyTodoTemplate = {
    id: 0,
    title: '',
    status: false,
    body: '',
    isFullMode: true,
    files: [],
    isCompleted: false
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
                files: ['3x.png', '1x.png'],
                isCompleted: true
            },
            {
                id: 2,
                date: '2024-04-13 19:18',
                title: 'kekwaitof',
                status: true,
                body: 'lololol',
                isFullMode: false,
                files: ['1x.png'],
                isCompleted: true
            },
        ],
    },
    reducers: {
        addEmptyTodo: (state, action) => {
            let newTodo = {}
            newTodo.id = action.payload;
            newTodo.date = "";
            newTodo.title = "";
            newTodo.status = false;
            newTodo.body = "";
            newTodo.isFullMode = true;
            newTodo.files = [];
            newTodo.isCompleted = false;
            state.todos.unshift(newTodo);
        },
        updateTodo: (state, action) => {
            let buf = produce(state.todos, draft => {
                let todoToChange = draft.find((todo) => todo.id === action.payload.id);
                todoToChange.id = action.payload.id;
                todoToChange.title = action.payload.title;
                todoToChange.body = action.payload.body;
                todoToChange.status = action.payload.status;
                todoToChange.date = action.payload.date;
                todoToChange.isCompleted = true;
            });
            state.todos = buf;
            saveTodos(state);
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
            state.todos = produce(state.todos, draft => {
                let todoToChange = draft.find((todo) => todo.id === action.payload);
                if (todoToChange?.hasOwnProperty('isFullMode')) {
                    todoToChange.isFullMode = !todoToChange.isFullMode;
                }
            });
        },
        removeFileFromTodo: (state, action) => {
            state.todos = produce(state.todos, draft => {
                let todoToChange = draft.find((todo) => todo.id === action.payload.id);
                todoToChange.files = todoToChange.files?.filter((element) => element != action.payload.fileName)})
        },
        closeCreatingWindow: (state) => {
            state.todos = produce(state.todos, draft => {
                draft.forEach((todo) => todo.isFullMode = false);
            })
        },
        addFile: (state, action) => {
            state.todos = produce(state.todos, draft => {
                let todoToChange = draft.find((todo) => todo.id === action.payload.id);
                if (!todoToChange) {
                    todoToChange = {
                        id: 0,
                        title: '',
                        status: 'false',
                        body: '',
                        isFullMode: true};
                    todoToChange.id = action.payload.id;
                    todoToChange.isCompleted = false;
                    todoToChange.files = [];
                    state.todos.unshift(todoToChange);
                }
                todoToChange.files.push(action.payload.fileName)
            })
        },
        clearUncompleted: (state) => {
            state.todos = state.todos.filter((todo) => todo.isCompleted);
        }       
    }
});

const _removeTodo = (id, state) => {
    let output = current(state.todos).filter((todo) => {
        return todo.id !== id;
    })
    return output;
}

export const getId = (state) => {
    return current(state.todos).length + 1;
}

export const selectAllTodos = (state) => {
    return state.todoNotes.todos;
}

export const selectIsCreating = (state) => {
    return state.todoNotes.isCreating;
}

const saveTodos = (state) => {
    console.log(current(state));
    const storage = getStorage(firebase);
    const todos = current(state).todos;
    let storageFolder = "/todos/"
    todos.forEach(todoObj => {
        const path = storageFolder + todoObj.id + ".txt"
        const storageRef = ref(storage, path);
        const blob = new Blob([JSON.stringify(todoObj, null, 2)], {type : 'text/plain'});
        uploadBytes(storageRef, blob).then(() => {
            console.log(blob);
        })
    })
}

const getInitTodos = (state) => {
    const storage = getStorage(firebase);
    const storageRef = ref(storage, "/todos/")
    listAll(storageRef).then((res) => console.log(res.items));
}


export const { addTodo, removeTodo, 
    toggleMode, toggleCreatingWindow,
    toggleFullMode, updateTodo,
    removeFileFromTodo, closeCreatingWindow,
    addFile, clearUncompleted,addEmptyTodo  } = todoNotesSlice.actions;

export default todoNotesSlice.reducer;