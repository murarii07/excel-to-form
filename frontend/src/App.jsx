
import MyTask from './Organism/dashBoard';
import FormUpload from './Organism/FormUpload';
import Nav from './Molecules/Navbar';
import Preview from './Molecules/preview';
import Profile from './Organism/Profile';
import XlUpload from './Molecules/xlUpload';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' 
        element={<div className="App">
          <Nav />
          <XlUpload />
          <Preview />
        </div>} />
        
        <Route path='MyTasks' element={<MyTask />}  />
        
        <Route path='form' element={<MyTask />}  /> {/* changes  should be made  */}
        <Route path='my-profile' element={<Profile />}  />
        <Route path='formId' element={<FormUpload />}  />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
