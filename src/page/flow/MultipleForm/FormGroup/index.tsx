import SchemaForm from './SchemaForm'
import { ISchema } from '@formily/react'
import { FC } from 'react'
import {Divider} from 'antd'

interface FormGroupProps {
  schema: {[k: string]: ISchema}
}
export const FormGroup: FC<FormGroupProps> = ({schema}) => {

  console.log(2222222, schema)

  return (
    <div>
      {
        Object.keys(schema).map(k => {
          return (
            <div key={k}>
              <SchemaForm schema={schema[k]}  />
              <Divider/> 
            </div>
          )

        })
      }
    </div>
  )
}