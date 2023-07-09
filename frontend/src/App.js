import './App.css';
import {Route, Routes} from "react-router-dom";
import {Layout} from './Components/Layout'
import { Homepage } from './Pages/Homepage';
import { LoginPage } from './Pages/LoginPage';
import { RegisterPage } from './Pages/RegisterPage';

export const App = () => {
  return(
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Homepage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Route>
    </Routes>
  )
}
