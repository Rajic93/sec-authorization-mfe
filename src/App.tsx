import { useState } from 'react'
import './App.css'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Resources from "./pages/Resources.tsx";
import Live from "./pages/Live.tsx";
import Contact from "./pages/Contact.tsx";
import ResourcesCreate from "./pages/ResourcesCreate.tsx";
import ResourcesEdit from "./pages/ResourcesEdit.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <BrowserRouter>
          <ul>
              <Link to="/" className="list">
                  Home
              </Link>
              <Link to="/resources" className="list">
                  Resources
              </Link>
              <Link to="/live" className="list">
                  Live course
              </Link>
              <Link to="/contact" className="list">
                  Contact
              </Link>
          </ul>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/resources" element={<Resources/>}/>
              <Route path="/resources/create" element={<ResourcesCreate/>}/>
              <Route path="/resources/:id" element={<ResourcesEdit/>}/>
              <Route path="/live" element={<Live/>}/>
              <Route path="/contact" element={<Contact/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
