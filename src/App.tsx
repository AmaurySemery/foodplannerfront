import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Home from './pages/Home'
import Login from './pages/Login'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route path='home' element={<Home />} />
    <Route path='login' element={<Login />} />
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