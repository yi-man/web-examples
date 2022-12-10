import {useState, useMemo, useCallback} from 'react'
import { ISchema, SchemaProperties } from '@formily/react'
import {nodes as nodeModels, initialNodes, DataNode} from './nodes'
import {
  Node,
} from 'reactflow';

export type SchemaState = {[k: string]: {[k: string]: ISchema}}
type AnySchemaProperties = SchemaProperties<any, any, any, any, any, any, any, any>
// 假设有两个trainer
const trainers = ['trainer1', 'trainer2'] as const 

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

const decoratorSchema = (schema: ISchema) => {
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

const add = (schema: SchemaState, n: DataNode) => {
  trainers.forEach((t, index) => {
    if(n.data.schema[index]) {
      schema[t][n.id] =  decoratorSchema(n.data.schema[index])
    }
  })
}

const del = (schema: SchemaState, deletedNodes: DataNode[]) => {
  deletedNodes.forEach((n) => {
    trainers.forEach((t, index) => {
        delete schema[t][n.id]  
    })
  })
}

export const useSchema = () => {

  const initialSchema = useMemo(() => {
    const schema: SchemaState = {}
    trainers.forEach(t => {
      schema[t] = {}
    })

    initialNodes.forEach(n => {
      add(schema, n)
    })

    return schema
  }, [initialNodes])

  const [schema, setSchema] = useState<SchemaState>(initialSchema)

  const addSchema = useCallback((n: DataNode) => {
    add(schema, n)
    setSchema(schema)
  }, [schema])

  const deleteSchema = useCallback((deletedNodes: DataNode[]) => {
    del(schema, deletedNodes)
    setSchema(schema)
  }, [schema])

  return {
    schema,
    addSchema,
    deleteSchema,
    selectedSchema: trainers[0]
  }
}