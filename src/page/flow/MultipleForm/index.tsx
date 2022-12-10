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
import {nodes as nodeModels, initialNodes} from './nodes'
import {nodeOrigin, defaultEdgeOptions, getId, canConnect, onDragOver} from './utils'

import styles from './dnd.module.css';






// 假设有两个trainer
const trainers = ['trainer1', 'trainer2'] as const 

const DnDFlow = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const initialSchema = useMemo(() => {
    const schemas: {[k: string]: ISchema} = {
      [trainers[0]]: {},
      [trainers[1]]: {},
    }

    initialNodes.forEach(n => {
      schemas[trainers[0]] = n.data.schema[0]
      schemas[trainers[1]] = n.data.schema[1]
    })

    return schemas
  }, [initialNodes])
  const [schema, setSchema] = useState<{[k: string]: ISchema}>(initialSchema)


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
      const type = event.dataTransfer.getData('application/reactflow');

      const position = reactFlowInstance.project({
        x: event.clientX - 180,
        y: event.clientY,
      });

      const nodeModel = nodeModels.find(node => node.id === type)

      const newNode: Node = {
        id: getId(nodeModel?.id),
        type,
        position,
        data: { label: `${type} node` },
      };

      if(nodeModel) {
        newNode.type = nodeModel.type,
        newNode.data = nodeModel.data
      }

      setNodes((nds) => nds.concat(newNode));

      setSchema((s) => {
        if(s.properties) {
          (s.properties as any)[newNode.id] = newNode.data.schema
        }

        return s
      })
    }
  };

  const onNodeMouseEnter = useCallback((event: React.MouseEvent, node: Node) => {
  }, [])

  const onEdgeContextMenu= useCallback((event: React.MouseEvent, edge: Edge) => {
  }, [])

  const onNodesDelete = useCallback((newNodes: Node[])=>{
    setSchema((s) => {
      newNodes.forEach((n) => {
        // @ts-ignore
        delete s.properties[n.id]
      })
      
      return s
    })
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
