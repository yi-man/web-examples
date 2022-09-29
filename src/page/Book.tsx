import { FC, memo } from 'react';
import {useRequest} from 'ahooks'
import {getBook} from '../service/book'

interface BookProps {
  placeholder?:string
}
export const Book: FC<BookProps> = memo(() => {
  const {data} = useRequest(getBook)
  return <div>{data?.bu}{data?.isDeyou() ? 'deyou' : 'no deyou'}</div>;
});

Book.displayName = 'Book';

