import React, { useState, DragEvent, useCallback, useMemo } from 'react';
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
import { ISchema } from '@formily/react'

import Sidebar from './Sidebar';
import 'reactflow/dist/style.css'
import './rewrite.css'
import {ConfigMenu} from './ConfigMenu'
import {nodes as nodeModels, initialNodes, DataNode} from './nodes'
import {nodeOrigin, defaultEdgeOptions, getId, canConnect, onDragOver} from './utils'

import styles from './dnd.module.css';
import {useSchema} from './useSchema'





// 假设有两个trainer
const trainers = ['trainer1', 'trainer2'] as const 

const DnDFlow = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const {schema, addSchema, deleteSchema} = useSchema()

  const onInit = (rfi: ReactFlowInstance) => setReactFlowInstance(rfi);
  
  const onConnect = useCallback((params: Connection | Edge) => {
    if(canConnect(params, nodes)) {
      setEdges((eds) => addEdge(params, eds))
    } else {
      message.error('无法连接')
    }
  }, [nodes])

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const type = event.dataTransfer.getData('application/reactflow') as DataNode['type'];

      const position = reactFlowInstance.project({
        x: event.clientX - 180,
        y: event.clientY,
      });

      const nodeModel = nodeModels.find(node => node.id === type)

      const newNode: DataNode = {
        id: getId(nodeModel?.id),
        type,
        position,
        data: { label: `${type} node`, schema: [] },
      };

      if(nodeModel) {
        newNode.type = nodeModel.type,
        newNode.data = nodeModel.data
      }

      setNodes((nds) => nds.concat(newNode));

      addSchema(newNode)
    }
  };

  const onNodeMouseEnter = useCallback((event: React.MouseEvent, node: Node) => {
  }, [])

  const onEdgeContextMenu= useCallback((event: React.MouseEvent, edge: Edge) => {
  }, [])

  const onNodesDelete = useCallback((newNodes: Node[])=>{
    deleteSchema(newNodes as DataNode[])
  }, [])


  console.log(111111111111, schema)
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
            onConnect={onConnect}
            onInit={onInit}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeOrigin={nodeOrigin}
            onNodeMouseEnter={onNodeMouseEnter}
            // onEdgeDoubleClick
            defaultEdgeOptions={defaultEdgeOptions}
            onNodesDelete={onNodesDelete}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <ConfigMenu schema={schema}/>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
