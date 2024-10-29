
import MyTask from './Organism/dashBoard';
import FormUpload from './Organism/FormUpload';

import Profile from './Organism/Profile';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Organism/Login';
import Register from './Organism/Register';
import Home from './Organism/Home';
import './App.css'
import './index.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />}  />
        <Route path='signup' element={<Register />}  />
        <Route path='my-profile' element={<Profile />}  />
        <Route path='tasks' element={<MyTask />}  />
        <Route path='formId' element={<FormUpload fields={[]}  />}  />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
