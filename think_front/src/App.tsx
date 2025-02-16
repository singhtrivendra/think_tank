import { DashBoard } from "./pages/dashboard";
import { Signin } from "./pages/Signin";

import { HashRouter,Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/Signup";
import LandingPage from "./pages/LandingPage";

function App(){
  return <HashRouter>
  <Routes>
    <Route path="/" element={<LandingPage/>}/>
    <Route path="/Signup" element={<SignUp/>} />
    <Route path="/Signin" element={<Signin/>} />
    <Route path="/dashboard" element={<DashBoard/>} />
  </Routes>
  </HashRouter>

}

export default App