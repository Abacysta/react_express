import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Wykresy from "./components/Wykresy";
import TabeleD from "./components/TabeleD";
import TabeleC from "./components/TabeleC";

function App() {
  const user = localStorage.getItem("token");
  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      
      <Route path="/wykresy" exact element={<Wykresy />} /> 
      <Route path="/tabeleD" exact element={<TabeleD />} /> 
      <Route path="/tabeleC" exact element={<TabeleC />} />  
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
