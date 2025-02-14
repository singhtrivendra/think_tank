import { DashBoard } from "./pages/dashboard";
import { Signin } from "./pages/Signin";

import { BrowserRouter,Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/Signup";

function App(){
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<SignUp/>}/>
    <Route path="/Signup" element={<SignUp/>} />
    <Route path="/Signin" element={<Signin/>} />
    <Route path="/dashboard" element={<DashBoard/>} />
  </Routes>
  </BrowserRouter>

}

export default App