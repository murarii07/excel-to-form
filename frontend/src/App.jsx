
import MyTask from './Organism/dashBoard';
import FormUpload from './Organism/FormUpload';
import Profile from './Organism/Profile';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Organism/Login';
import Register from './Organism/Register';
import Home from './Organism/Home';
import './App.css'
import './index.css'
import NotFound from './Organism/NotFound';
import PrivateRoute from './Organism/PrivateRoute';
import UserForm from './Organism/userForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Register />} />
        <Route path='my-profile' element={<PrivateRoute element={<Profile />} />} />
        <Route path='tasks' element={<PrivateRoute element={<MyTask />} />} />
        <Route path='formId' element={<PrivateRoute element={<FormUpload />} />} />
        <Route path='public/*'element={<UserForm />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
