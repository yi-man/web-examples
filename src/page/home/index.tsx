import { FC, memo, useEffect, useState } from 'react';
import { observer } from "mobx-react";
import reactLogo from './react.svg'
import './App.css'
import {Button} from 'antd'
import {Link} from 'react-router-dom'

interface HomeProps {
  placeholder?:string
}
export const Home: FC<HomeProps> = observer(() => {
  const [count, setCount] = useState(0)

  return (
     <div className="App">
        
        <div className="card">
          <Button onClick={() => setCount((count) => count + 1)} type='primary'>
            count is {count}
          </Button>
        </div>
        
        <div>
          <Link to='/book?a=1'>book</Link>
        </div>
      </div> 
  );
});

Home.displayName = 'Home';

