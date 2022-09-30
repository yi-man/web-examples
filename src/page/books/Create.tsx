import { FC, memo, useEffect, useState } from 'react';
import {useRequest} from 'ahooks'
import { observer } from "mobx-react";

interface CreateBookProps {
  placeholder?:string
}
export const CreateBook: FC<CreateBookProps> = observer(() => {

  
  return <div>
    create Book
  </div>;
});

CreateBook.displayName = 'CreateBook';

