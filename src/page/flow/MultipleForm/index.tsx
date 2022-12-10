import { message } from 'antd';
import React, { DragEvent, useCallback, useState } from 'react';
import ReactFlow, {
  addEdge, Background, Connection, Controls, Edge,
  Node, ReactFlowInstance, ReactFlowProvider, useEdgesState, useNodesState
} from 'reactflow';

import 'reactflow/dist/style.css';
import { ConfigMenu } from './ConfigMenu';
import './rewrite.css';
import Sidebar from './Sidebar';
import { DataNode, initialNodes, nodeModels } from './useSchema/nodeModels';
import { canConnect, defaultEdgeOptions, getId, nodeOrigin, onDragOver } from './utils';

import styles from './dnd.module.css';
import { useSchema } from './useSchema';


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

  console.log(111111111111, schema.trainer1)

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
