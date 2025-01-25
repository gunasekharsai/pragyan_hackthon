
import './App.css'
import Home from './Pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './Pages/Map';
import Gov from './Pages/Gov';

function App() {


  return (


    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      <Route path="/gov" element={<Gov />} />

      
    </Routes>
  </Router>
  //  <div >
  //      <Home/>
  //  </div>
  )
}

export default App
