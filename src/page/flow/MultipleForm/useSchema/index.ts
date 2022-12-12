import { useCallback, useMemo, useState } from 'react';
import { DataNode, initialNodes } from './nodeModels';
import {Schema} from './schema'

export type SchemaState = Schema['schema']
export const useSchema = () => {
  const schemaInstance = useMemo(() => new Schema(), [])

  const initialSchema = useMemo(() => {
    schemaInstance.addNodes(initialNodes)

    return schemaInstance.schema
  }, [initialNodes])

  const [schema, setSchema] = useState<Schema['schema']>(initialSchema)

  const addSchema = useCallback((n: DataNode) => {
    schemaInstance.addNodes([n])

    setSchema(schemaInstance.schema)
  }, [schema])

  const deleteSchema = useCallback((deletedNodes: DataNode[]) => {
    schemaInstance.deleteNodes(deletedNodes)

    setSchema(schemaInstance.schema)
  }, [schema])

  return {
    schema,
    addSchema,
    deleteSchema,
    defaultTrainer: Object.keys(schema)[0]
  }
}