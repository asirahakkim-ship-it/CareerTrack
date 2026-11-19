import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddApplication from "./pages/AddApplication";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
function App(){
  return(
    <>
    <Navbar/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/add-application" element={<AddApplication/>}/>
      <Route path="/my-applications" element={<MyApplications/>}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Home />} />
    </Routes>
    </>
  );
}
export default App;