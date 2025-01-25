
import './App.css'
import Home from './Pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './Pages/Map';

function App() {


  return (


    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/map" element={<Map />} />
      
    </Routes>
  </Router>
  //  <div >
  //      <Home/>
  //  </div>
  )
}

export default App
