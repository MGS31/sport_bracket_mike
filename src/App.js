import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import LandingPage from './pages/LandingPage';
import Brackets from './pages/Brackets';

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/brackets" element={<Brackets />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
