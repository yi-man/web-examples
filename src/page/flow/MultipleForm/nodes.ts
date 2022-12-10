import {
  Node,
} from 'reactflow';
import {schema} from './schema'

type SpecificNode = Omit<Node, 'type'> & {
  type: 'input' | 'output' | 'default'
}

export const nodes = [
  {
    id: 'dataset',
    type: 'input',
    data: [
      { label: '选择数据集',  schema: schema.dataset},
      { label: '选择数据集2',  schema: schema.dataset}
    ],
  },
  {
    id: 'data-cut',
    type: 'default',
    data: [
      { 
        label: schema['data-cut'].title,
        schema: schema['data-cut']
      },
      { 
        label: schema['data-cut'].title,
        schema: schema['data-cut']
      },
    ]
  },
  {
    id: 'xgb',
    type: 'default',
    data: [
      { 
        label: schema.xgb.title,
        schema: schema.xgb
      },
      { 
        label: schema.xgb.title,
        schema: schema.xgb
      }
    ],
  },
] as const;

export const initialNodes: SpecificNode[] = [
  {
    ...nodes[0],
    id: 'dataset1',
    position: { x: 250, y: 100 },
  },
];


