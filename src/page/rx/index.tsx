import { FC, memo, useState, useEffect } from 'react';
import { range, filter, map, interval } from 'rxjs';


interface RxDemoProps {
  placeholder?:string
}
export const RxDemo: FC<RxDemoProps> = memo(() => {
  const [state, setState] = useState<number>(0);

  const observable$ = interval(1000);

  useEffect(() => {
    observable$.subscribe((value) => setState(value));
  }, []);

  // range(1, 200)
  // .pipe(
  //   filter(x => x % 2 === 1),
  //   map(x => x + x)
  // )
  // .subscribe(x => console.log(x));

  return <div>
      <h1>Hello RxJS!</h1>
      <p>Observable value: {state}</p>
    </div>;
});

RxDemo.displayName = 'RxDemo';

