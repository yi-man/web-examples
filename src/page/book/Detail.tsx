import { FC, memo, useEffect, useState } from 'react';
import {useRequest} from 'ahooks'
import {getBook} from '../../service/book'
import {BookStore} from '../../store'
import { observer } from "mobx-react";

interface BookProps {
  placeholder?:string
}
export const Book: FC<BookProps> = observer(() => {
  const [localStore] = useState(() => new BookStore());

  // console.log(localStore.book?.buCode)
  useEffect(()=> {
    localStore.fetchBook()
  }, [])


  // const {data} = useRequest(getBook)
  if(!localStore) {
    return <div>empty</div>
  }
  return <div>{localStore.book?.bu}{localStore.book?.getBuType().isDeyou ? 'deyou' : 'no deyou'}</div>;
});

Book.displayName = 'Book';

