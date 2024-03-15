import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CodeExecution from './Pages/CodeExecution'
import Auth from './Pages/Auth'
import LoginForm from './Pages/Authenctication/Login'
import SignUpForm from './Pages/Authenctication/Signup'
import { Home } from '@mui/icons-material'

function App() {

  return (
 <>
  <BrowserRouter>
    <Routes>
      <Route path='/assesment' element={<CodeExecution/>} />
      <Route path="/" element={<Auth/>}/>
      <Route path="/login" element= {<LoginForm/>}></Route>
      <Route path='/signup'element={<SignUpForm/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      
    </Routes>

    </BrowserRouter>

 </>
  )

}

export default App
