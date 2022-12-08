import  {
  Connection,
  Edge,
  Node,
  NodeOrigin,
  MarkerType
} from 'reactflow';
import  {  DragEvent } from 'react';


let id = 0;
export const getId = (prefix?: string) => `${prefix ? prefix : 'dndnode'}_${id++}`;


export const canConnect = (params: Connection | Edge, nodes: Node[]) => {
  // const source = params.source as string
  // const target = params.target as string
  // const sourceNode = nodes.find(node => node.id === source) as SpecificNode
  // const targetNode = nodes.find(node => node.id === target) as SpecificNode

  // return sourceNode?.type !== 'input' && targetNode.type !== 'output'

  return true
}

export const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

export const nodeOrigin: NodeOrigin = [0.5, 0.5];

export const defaultEdgeOptions = {
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
  style: {
    strokeWidth: 2,
  },
};

