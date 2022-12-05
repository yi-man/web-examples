import React,{ useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import {Book} from './page/book/Detail'
import {Home} from './page/home'
import {CreateBook} from './page/book/Create'
import {StateMachine as LightStateMachine} from './page/stateMachine/light'
import {StateMachine as StepsStateMachine} from './page/stateMachine/steps'
import {RxDemo} from './page/rx'
import Formily from './page/formily'
import FormilyAlgo from './page/formily/Algo'

import {JsonSchemaForm} from './page/jsonSchemaForm'



var postMessage = function(type: string, data: any) {
  if (window.parent !== window) {
      window.parent.postMessage({
          type: type,
          data: data,
      }, '*');
  }
}
// 为了让URL地址尽早地更新，这段代码需要尽可能前置，例如可以直接放在document.head中
// postMessage('afterHistoryChange', { url: location.href });

const _historyWrap = function(type: any) {
  const orig = (history as any)[type];
  const e = new Event(type);
  return function() {
    // @ts-ignore
    const rv = orig.apply(this, arguments);
    (e as any).arguments = arguments;

    window.dispatchEvent(e);
    return rv;
  };
};
history.pushState = _historyWrap('pushState');
history.replaceState = _historyWrap('replaceState');

window.addEventListener('popstate', function(event) {
  postMessage('afterHistoryChange', { url: location.href });
})

window.addEventListener('pushState', function(e) {
  postMessage('afterHistoryChange', { url: location.href });
});

const router = createBrowserRouter([
  {
    path: "/jsf",
    element: <JsonSchemaForm />,
  },
  
  {
    path: "/formily/algo",
    element: <FormilyAlgo />,
  },
  {
    path: "/formily",
    element: <Formily />,
  },
  {
    path: "/rx",
    element: <RxDemo />,
  },
  {
    path: "/state-machine/steps",
    element: <StepsStateMachine />,
  },
  {
    path: "/state-machine",
    element: <LightStateMachine />,
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
