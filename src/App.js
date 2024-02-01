import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Visualization from './pages/visualization';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Visualization/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
