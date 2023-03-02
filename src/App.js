import './App.css';
import PathVisualizer from './visualizer/PathVisualizer';

function App() {
  return (
    <div className="App" draggable={false}>
      <PathVisualizer draggable={false}/>
    </div>
  );
}

export default App;
