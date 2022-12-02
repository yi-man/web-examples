import { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import {FC} from 'react'
import {Form} from '@rjsf/antd'
import {schema, uiSchema} from './schema'


const log = (type: string) => console.log.bind(console, type);

interface JsonSchemaFormProps{}
export const JsonSchemaForm: FC<JsonSchemaFormProps> = () => {
  
  return (
  <Form 
    schema={schema}
    uiSchema={uiSchema}
    validator={validator}
    onChange={log("changed")}
    onSubmit={log("submitted")}
    onError={log("errors")} />
  )
}