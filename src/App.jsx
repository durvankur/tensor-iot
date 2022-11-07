import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import { Transactions } from './containers/transactions';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path='/' element={<Transactions/>} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
