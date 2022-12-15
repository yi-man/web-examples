import  {
  Connection,
  Edge,
  Node,
  NodeOrigin,
  MarkerType
} from 'reactflow';
import  {  DragEvent } from 'react';

export const canConnect = (params: Connection | Edge, nodes: Node[]) => {
  // const source = params.source as string
  // const target = params.target as string
  // const sourceNode = nodes.find(node => node.id === source) as SpecificNode
  // const targetNode = nodes.find(node => node.id === target) as SpecificNode

  // return sourceNode?.type !== 'input' && targetNode.type !== 'output'

  return true
}

 const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

 const nodeOrigin: NodeOrigin = [1, 1];

 const defaultEdgeOptions = {
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
  style: {
    strokeWidth: 2,
  },
};

export const flowDefaultConfig = {
  defaultEdgeOptions,
  nodeOrigin,
  onDragOver
}

export class IdManager {
  static componentId = 0

  static getComponentId = (prefix?: string) => `${prefix ? prefix : 'dndnode'}_${IdManager.componentId++}`;

  static geComponentDataId = (tabId: string, nodeId: string) => `${tabId}-${nodeId}`
}
