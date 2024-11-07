
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
import FormDetails from './Organism/FormDetails';
import UserDp from './Atoms/userdp';
function Tasks(){
  return(
    
    <Routes>
      <Route path='/'  element={<MyTask />} />
      <Route path='*'  element={<FormDetails />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Register />} />
        <Route path='my-profile' element={<Profile />}  />
        <Route path='tasks/*' element={<Tasks />}/>
        <Route path='formId' element={<FormUpload />} />
        <Route path='public/*'element={<PrivateRoute element={<UserForm />} />} />
        <Route path='*' element={<NotFound />} />
        <Route path='demo' element={<UserDp />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
