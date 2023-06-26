import './App.css';

import ButtonAppBar from './components/app-bar/app-bar';
import Todo from './components/todo/todo';

function App() {
  return (
    <div className="w-screen h-full bg-orange-200">
      <div className="appBar">
        <ButtonAppBar />
      </div>
      <Todo />
    </div>
  );
}

export default App;
