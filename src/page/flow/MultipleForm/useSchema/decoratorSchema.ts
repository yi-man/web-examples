
import { ISchema, SchemaProperties } from '@formily/react';

type AnySchemaProperties = SchemaProperties<any, any, any, any, any, any, any, any>

type UiType = 'Input' | 'Password' | 'Select' | 'Checkbox' | 'NumberPicker'
type UiSchema = {
  [k in UiType]: {
    'x-decorator': 'FormItem',
    'x-component': UiType
  }
}

// x-component-props 属性怎么办， 如 NumberPicker 的step
// x-reactions 报错信息的国际化问题
const uiSchema: UiSchema = {
  Input: {
    'x-decorator': 'FormItem',
    'x-component': 'Input'
  },
  Select: {
    'x-decorator': 'FormItem',
    'x-component': 'Select'
  },
  Password: {
    'x-decorator': 'FormItem',
    'x-component': 'Password'
  },
  Checkbox: {
    'x-decorator': 'FormItem',
    'x-component': 'Checkbox'
  },
  NumberPicker: {
    'x-decorator': 'FormItem',
    'x-component': 'NumberPicker'
  }
}

export const decoratorSchema = (schema: ISchema) => {
  if(schema.type === 'object') {
    if(!schema['x-decorator']){
      schema['x-decorator'] = 'Section'
    }

    if(schema.properties) {
      const properties = schema.properties as AnySchemaProperties
      Object.keys(properties).forEach(property => {
        decoratorSchema(properties[property])
      })
    }
  } else {
    let uiType: UiType = 'Input'
    if(schema.type === 'string' && schema.enum) {
      uiType = 'Select'
    } else if (schema.type === 'password') { 
      uiType = 'Password' 
    } else if(schema.type === 'number') {
      uiType = 'NumberPicker' 
    } else if (schema.type === 'boolean') {
      uiType = 'Checkbox'
    }

    const defaultUiSchema = uiSchema[uiType]

    if(!schema['x-decorator']){
      schema['x-decorator'] = defaultUiSchema['x-decorator']
    }
    if(!schema['x-component']){
      schema['x-component'] = defaultUiSchema['x-component']
    }
  } 

  return schema
}