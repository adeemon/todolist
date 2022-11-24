import logo from './logo.svg';
import store from './store/store'
import { Provider } from 'react-redux';
import './App.css';
import { TodoNotes } from './features/todoNote/TodoNotes'

function App() {
    return ( 
      <Provider store={store}>
        <TodoNotes />
      </Provider>
    )
}

export default App;