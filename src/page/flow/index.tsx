import React, { useState, DragEvent, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  ReactFlowInstance,
  Connection,
  Edge,
  Node,
  useNodesState,
  useEdgesState,
  Controls,
  NodeOrigin,
  Background,
  MarkerType
} from 'reactflow';
import {message} from 'antd'

import Sidebar from './Sidebar';
import 'reactflow/dist/style.css'
import './rewrite.css'
import {ConfigMenu} from './ConfigMenu'

import styles from './dnd.module.css';

type SpecificNode = Omit<Node, 'type'> & {
  type: 'input' | 'output' | 'default'
}

const initialNodes: SpecificNode[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 100 },
  },
];

const defaultEdgeOptions = {
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
  style: {
    strokeWidth: 2,
  },
};
const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeOrigin: NodeOrigin = [0.5, 0.5];

const canConnect = (params: Connection | Edge, nodes: Node[]) => {
  // const source = params.source as string
  // const target = params.target as string
  // const sourceNode = nodes.find(node => node.id === source) as SpecificNode
  // const targetNode = nodes.find(node => node.id === target) as SpecificNode

  // return sourceNode?.type !== 'input' && targetNode.type !== 'output'

  return true
}


const DnDFlow = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openDrawer = useCallback(()=>{
    setIsOpen(true)
  }, [])
  const closeDrawer = useCallback(()=>{
    setIsOpen(false)
  }, [])

  const onConnect = useCallback((params: Connection | Edge) => {
    if(canConnect(params, nodes)) {
      setEdges((eds) => addEdge(params, eds))
    } else {
      message.error('无法连接')
    }
  }, [nodes])
  const onInit = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi);

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({
        x: event.clientX - 180,
        y: event.clientY,
      });
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    }
  };

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node)=>{
    openDrawer()
  }, [])

  const onNodeMouseEnter = useCallback((event: React.MouseEvent, node: Node) => {
  }, [])

  const onEdgeContextMenu= useCallback((event: React.MouseEvent, edge: Edge) => {
    console.log(11111111111, edge)
  }, [])

  return (
    <div className={styles.dndflow}>
      <ReactFlowProvider>
        <Sidebar />
        <div className={styles.wrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onNodesChange={onNodesChange}
            onNodeClick={onNodeClick}
            onConnect={onConnect}
            onInit={onInit}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeOrigin={nodeOrigin}
            onNodeMouseEnter={onNodeMouseEnter}
            // onEdgeDoubleClick
            defaultEdgeOptions={defaultEdgeOptions}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <ConfigMenu />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
