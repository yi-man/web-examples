import {
  Node,
} from 'reactflow';
import {schema} from './schema'
import { ISchema } from '@formily/react'

type DataType = { label: string,  schema: ISchema[]}
type NodeType = 'input' | 'output' | 'default'
export type DataNode = Omit<Node<DataType>, 'type'> & {
  type: NodeType
}

export const nodeModels = [
  {
    id: 'dataset',
    type: 'input',
    data: {
      label: '选择数据集',
      schema: [schema.dataset, schema.dataset]
    },
  },
  {
    id: 'xgboost',
    type: 'default',
    data: {
      label: schema['xgboost'].title,
      schema: [schema['xgboost_label'], schema['xgboost']]
    },
  },
  {
    id: 'data-cut',
    type: 'default',
    data: {
      label: schema['data-cut'].title,
      schema: [schema['data-cut']]
    },
  },
  {
    id: 'xgb',
    type: 'default',
    data: {
      label: schema.xgb.title,
      schema: [schema.xgb, schema.xgb]
    },
  },
] as DataNode[];

export const initialNodes = [
  {
    ...nodeModels[0],
    id: 'dataset1',
    position: { x: 250, y: 100 },
  } ,
] as DataNode[];


