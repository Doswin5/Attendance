import './App.css';
import { Routes, Route } from 'react-router-dom'
import { Navbar, Footer } from './components';
import { HomePage } from './pages';

function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path='/' element={ <HomePage /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
