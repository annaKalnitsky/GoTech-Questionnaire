import { Route, Routes } from 'react-router-dom';
import './App.css';
import Questionnaire from './components/Questionnaire';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/questionnaires/:id" element={<Questionnaire />} />
      </Routes>
    </div>
  );
}

export default App;
