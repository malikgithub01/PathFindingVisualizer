import './App.css';
import Visualizer from './visualizer/Visualizer';

function App() {
  return (
    <div className="App" draggable={false}>
      <Visualizer draggable={false}/>
    </div>
  );
}

export default App;
