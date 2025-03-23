
import MyTask from './Organism/Task';
import FormUpload from './Organism/FormUpload';
import Profile from './Organism/Profile';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Organism/Login';
import Register from './Organism/Register';
import Home from './Organism/Home';
import './Working.css'
import NotFound from './Atoms/NotFound';
// import PrivateRoute from './Organism/PrivateRoute';
import UserForm from './Organism/userForm';
import FormDetails from './Organism/FormDetails'; import Submit from './Atoms/Submit';
import EditForm from './Organism/EditForm';
import { useEffect } from 'react';
import Responses from './Organism/Responses';
function Tasks() {
  return (

    <Routes>
      <Route path='/' element={<MyTask />} />
      <Route path='*' element={<FormDetails />} />

    </Routes>
  )
}
function App() {
  useEffect(() => {
    let r = document.querySelector("body")
    r.setAttribute("class", "bg-gradient-to-br from-indigo-50 to-purple-50")
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Register />} />
        <Route path='my-profile' element={<Profile />} />
        <Route path='tasks/*' element={<Tasks />} />
        <Route path='preview' element={<FormUpload />} />
        <Route path='formhost/*' element={<UserForm />} />
        <Route path='submit' element={<Submit />} />
        <Route path='*' element={<NotFound />} />
        <Route path='edit' element={<EditForm />} />
        <Route path="responses/*" element={<Responses />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
