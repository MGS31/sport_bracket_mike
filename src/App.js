import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import home from './pages/home';
import bracket from './pages/bracket';

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact component={home} />
          <Route path="/brackets" exact component={bracket} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
