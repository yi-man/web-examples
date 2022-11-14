import { FC, memo, useEffect, useState } from 'react';
import { observer } from "mobx-react";
import reactLogo from './react.svg'
import './App.css'
import {Button} from 'antd'

interface HomeProps {
  placeholder?:string
}
export const Home: FC<HomeProps> = observer(() => {
  const [count, setCount] = useState(0)

  return (
     <div className="App">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <Button onClick={() => setCount((count) => count + 1)} type='primary'>
            count is {count}
          </Button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div> 
  );
});

Home.displayName = 'Home';

