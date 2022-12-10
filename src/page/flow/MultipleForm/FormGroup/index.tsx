import SchemaForm from './SchemaForm'
import { ISchema } from '@formily/react'
import { FC } from 'react'

interface FormGroupProps {
  schema: ISchema
}
export const FormGroup: FC<FormGroupProps> = ({schema}) => {
  return (
    <SchemaForm schema={schema} />
  )
}