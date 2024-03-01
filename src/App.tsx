import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import Layout from './assets/Layout'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route path='home' 
    </Route>
))

function App() {

  return (
    <>
      <h2>Food Planner</h2>
    </>
  )
}

export default App
