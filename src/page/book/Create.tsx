import { FC, memo, useCallback, useEffect, useState,  } from 'react';
import {useRequest} from 'ahooks'
import { observer } from "mobx-react";
import {Form, Input} from 'antd'
import {Book} from '../../service/book'

const {Item} = Form

interface CreateBookProps {
  placeholder?:string
}
export const CreateBook: FC<CreateBookProps> = observer(() => {
  const [form] =Form.useForm()
  const [book, setBook] = useState<Book>(new Book())

  const onValuesChange = useCallback((changed: any, allValues: any)=>{
    setBook(new Book(allValues))
  }, [])

  
  return (
    <div>
      <div>buCode: {book.buCode}</div>
      <div>isDeyou: {book.getBuType().isDeyou ? 'yes' : 'no'}</div>
      <Form form={form} onValuesChange={onValuesChange}>
        <Item name="buCode">
          <Input />
        </Item>  
      </Form> 
    </div> 
  );
});

CreateBook.displayName = 'CreateBook';

