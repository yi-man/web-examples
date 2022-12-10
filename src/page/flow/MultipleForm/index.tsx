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


const DnDFlow = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const {schema, selectedSchema, addSchema, deleteSchema} = useSchema()

  const [selectedTab, setSelectedTab] = useState<string>(selectedSchema)

  const onInit = (rfi: ReactFlowInstance) => {
    setReactFlowInstance(rfi);

    const stage = document.getElementById('stage')
    if(stage) {
      stage.oncontextmenu=function(e){
        e.preventDefault();
      }
    }
  }
  
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

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    const element = document.getElementById(`${selectedTab}-${node.id}`)
    element?.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  }, [selectedTab])


  return (
    <div className={styles.dndflow}>
      <ReactFlowProvider>
        <Sidebar />
        <div className={styles.wrapper} id='stage'>
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
            onNodeClick={onNodeClick}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <ConfigMenu schema={schema} activeKey={selectedTab} onTabClick={(k) => setSelectedTab(k)}/>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
