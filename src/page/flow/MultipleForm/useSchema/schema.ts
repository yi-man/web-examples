import { ISchema, SchemaProperties } from '@formily/react'
import {DataNode} from './nodeModels'

type AnySchemaProperties = SchemaProperties<any, any, any, any, any, any, any, any>

type UiType = 'Input' | 'Password' | 'Select' | 'Checkbox' | 'NumberPicker' | 'IntegerPicker'
| 'FloatPicker'
type UiSchema = {
  [k in UiType]: {
    'x-decorator': 'FormItem',
    'x-component': UiType,
    'x-component-props'?: object
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
  },
  IntegerPicker: {
    'x-decorator': 'FormItem',
    'x-component': 'NumberPicker',
    'x-component-props': {
      step: 1,
      style: {
            width: 240,
          },
    }
  },
  FloatPicker: {
    'x-decorator': 'FormItem',
    'x-component': 'NumberPicker',
    'x-component-props': {
      step: 0.1,
      style: {
        width: 240,
      },    }
  }
}

type SchemaState = {[trainer: string]: {[nodeId: string]: ISchema}}

const getTrainerId = (index: number) => `trainer${index+1}`
export class Schema{
  schema: SchemaState

  constructor(schema?: SchemaState) {
    this.schema = schema || {}
  }

  decoratorSchema(localSchema: ISchema) {
    const schema = localSchema
    if(schema.type === 'object') {
      if(!schema['x-decorator']){
        schema['x-decorator'] = 'Section'
      }
  
      if(schema.properties) {
        const properties = schema.properties as AnySchemaProperties
        Object.keys(properties).forEach(property => {
          this.decoratorSchema(properties[property])
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
      } else if (schema.type === 'integer') {
        uiType = 'IntegerPicker'
      } else if(schema.type === 'float') {
        uiType = 'FloatPicker'
      }
  
      const defaultUiSchema = uiSchema[uiType]
  
      if(!schema['x-decorator']){
        schema['x-decorator'] = defaultUiSchema['x-decorator']
      }
      if(!schema['x-component']){
        schema['x-component'] = defaultUiSchema['x-component']
      } 
      if(!schema['x-component-props']){
        schema['x-component-props'] = defaultUiSchema['x-component-props']
      }
    } 
  
    return schema
  }

  addNodes = (nodes: DataNode[]) => {
    const {schema} = this
    nodes.forEach((n)=> {
      n.data.schema.forEach((s, index) => {
        const k = getTrainerId(index)
    
        if(!schema[k]){
          schema[k] = {}
        }
    
        schema[k][n.id] = this.decoratorSchema(s)
      })
    })
    
    return schema
  }

  deleteNodes = (deletedNodes: DataNode[]) => {
    const {schema} = this;

    deletedNodes.forEach((n) => {
      n.data.schema.forEach((s, index) => {
        const k = getTrainerId(index)
        if(schema[k]){
          delete schema[k][n.id]  
        }
      })
    })
  
    return schema
  }

}

