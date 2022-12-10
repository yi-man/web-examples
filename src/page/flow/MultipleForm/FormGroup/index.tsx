import SchemaForm from './SchemaForm'
import { ISchema } from '@formily/react'
import { FC } from 'react'

interface FormGroupProps {
  schema: {[k: string]: ISchema}
}
export const FormGroup: FC<FormGroupProps> = ({schema}) => {
  return (
    <div>
      {
        Object.keys(schema).map(k => {
          return <SchemaForm schema={schema[k]} key={k} />
        })
      }
    </div>
  )
}