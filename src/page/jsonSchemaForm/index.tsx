import { Form } from '@rjsf/antd';
import validator, { customizeValidator } from "@rjsf/validator-ajv8";
import { createRef, FC, useCallback } from 'react';
// import props from './schema';
// import props from './validation'
import props from './error'
import { ErrorObject } from "ajv";



const log = (type: string) => console.log.bind(console, type);


function custom(errors: null | ErrorObject[] = []) {
  if (!(errors && errors.length)) return;
  errors.forEach(function(error) {
    let outMessage = "";

    switch (error.keyword) {
      case "required": {
        outMessage = "必填";
        error.instancePath = `/${error.params.missingProperty}`
        break;
      }
      default:
        outMessage = error.message || '';
    }

    error.message = outMessage;
  })

}

const validator2 = customizeValidator({}, custom);


interface JsonSchemaFormProps{}
export const JsonSchemaForm: FC<JsonSchemaFormProps> = () => {
  const formRef = createRef();

  const onSubmit = useCallback((d: any)=> {
    // @ts-ignore
    console.log(formRef.current)

    }, [])

  return (
  <Form 
    // @ts-ignore
    ref={formRef} 
    layout='horizontal'
    validator={validator2}
    showErrorList={false}
    liveValidate
    onChange={log("changed")}
    onSubmit={onSubmit}
    onError={log("error")}
    noHtml5Validate
    {...props}
    // className='ant-form ant-form-inline'
    // formContext={{
    //   labelCol:{span: 8},
    //   wrapperCol: {span: 16}
    // }}
    />
    
  )
}