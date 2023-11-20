import NavBar from "./component/NavBar/NavBar"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import Home from "./View/Home"

function App() {
  

  return (
    <BrowserRouter>
      <>
         <NavBar/>
        <Routes>
          <Route path="/" element={<Home/> } />
          
          

        </Routes>
   </> 
    </BrowserRouter>
  )
      
  
}

export default App
