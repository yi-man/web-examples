import { ISchema, SchemaProperties } from '@formily/react';
import { useCallback, useMemo, useState } from 'react';
import { DataNode, initialNodes } from './nodeModels';
import {decoratorSchema} from './decoratorSchema'

export type SchemaState = {[k: string]: {[k: string]: ISchema}}
// 假设有两个trainer
const trainers = ['trainer1', 'trainer2'] as const 

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