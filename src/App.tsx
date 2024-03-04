import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import { loginAction } from './components/FormLogin'
import { registerAction } from './components/FormRegister'
import Register from './pages/Register'
import Food from './pages/Food'
import FoodCreate from './pages/FoodCreate'
import { foodCreateAction } from './components/FormCreateFood'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route path='home' element={<Home />} />
    <Route path='login' element={<Login />} action={loginAction} />
    <Route path='register' element={<Register />} action={registerAction} />
    <Route path='foodlist' element={<Food />} />
    <Route path='foodcreate' element={<FoodCreate />} action={foodCreateAction} />
  </Route>
))

function App() {

  return (
    <>
      <h2>Food Planner</h2>
      <RouterProvider router={router} />
    </>
  )
}

export default App