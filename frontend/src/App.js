import './App.css';
import {Route, Routes} from "react-router-dom";
import {Layout} from './Components/Layout'
import { Homepage } from './Pages/Homepage';
import { LoginPage } from './Pages/LoginPage';
import { RegisterPage } from './Pages/RegisterPage';
import axios from "axios";
import { UserContextProvider } from './UserContext';
import { AccountPage } from './Pages/AccountPage';


axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

export const App = () => {
  return(
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}> 
          <Route index element={<Homepage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/account/:subpage?'element={<AccountPage/>} />
        </Route>
      </Routes>
    </UserContextProvider>
    
  )
}
