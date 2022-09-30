import React,{ useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import {Book} from './page/book/Detail'
import {Home} from './page/home'
import {CreateBook} from './page/book/Create'
import {StateMachine} from './page/stateMachine'


const router = createBrowserRouter([
  {
    path: "/state-machine",
    element: <StateMachine />,

  },
  {
    path: "/book/create",
    element: <CreateBook />,
  },
  {
    path: "/book",
    element: <Book />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  const [count, setCount] = useState(0)

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
      
    </React.StrictMode>
  )
}

export default App
