'use client'
import 'reactflow/dist/style.css'
import './index.css';

import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  useReactFlow,
  Panel,  
} from 'reactflow';
import ResizableNode from '@/components/Nodes/ResizableNode';
import ResizableNodeSelected from '@/components/Nodes/ResizableNodeSelected';
import CustomResizerNode from '@/components/Nodes/CustomResizerNode';
import Sidebar from './Sidebar';

import ResizeRotateD from '@/components/Nodes/js/ResizeRotateD';
import ResizeRotateR from '@/components/Nodes/js/ResizeRotateR';
import ResizeRotateEV from '@/components/Nodes/js/ResizeRotateEV';
import ResizeRotateV from '@/components/Nodes/js/ResizeRotateV';
import ResizeRotateNode from '@/components/Nodes/js/ResizeRotateNode';
import DownloadButton from '@/components/utils/DownloadButton';

import styles from '@/components/Nodes/js/style.module.css'
import rotation from '@/components/Nodes/js/ResizeRotateNode'

const flowKey = 'flow-loteamento'

const nodeTypes = {
  ResizableNode,
  ResizableNodeSelected,
  CustomResizerNode,  
  ResizeRotateD: ResizeRotateD,
  ResizeRotateR: ResizeRotateR,
  ResizeRotateEV: ResizeRotateEV,
  ResizeRotateV: ResizeRotateV,
  ResizeRotateNode: ResizeRotateNode,
}

const initialNodes = [  
  {
    id: '1',
    type: 'CustomResizerNode',
    data: { label: 'Custom Resize Icon' },
    position: { x: 1000, y: 100 },
    style: {
      background: 'url(/img/loteamento.webp)',
      fontSize: 12,
      border: '1px solid black',
      padding: 5,
      borderRadius: 15,
      height: 3900,
      width:5210,
      color:'black',
      backgroundSize:'cover'
    },
  },
  {
    id: '2',
    type: 'ResizeRotateD',
    position:{ x: 1000, y: 100 },
    data: { label: `Go back` },
    style: {                    
      fontSize: 12,      
      padding: 5,
      borderRadius: 15,
      height: 150,
      color:'black',          
    },
    parentNode:'1',
  }

];

const edges = [
  {
    id: '1->2',
    source: '1',
    target: '2',
    type: 'smoothstep',
  },
];

interface initialEdges {
  id:string;
  source: string;
  target:string;
}


const initialEdges:initialEdges[] = [];

let id = 0;
const getId = () => `dndnode_${id++}${+new Date()}`;



const SaveRestore = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();
  const reactFlowWrapper = useRef(null);

  const onConnect = useCallback((params:any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      console.log(`FLOW: ${JSON.stringify(flow)}`)
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    let node = document.getElementsByTagName(".div")
    console.log(`QuerySelector: ${JSON.stringify(node)} - ${node.length}`)
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));      
      console.log(`FLOW: ${JSON.stringify(flow)}`)
      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  const onDragOver = useCallback((event:any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event:any) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = rfInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
            
      const newNode = {
        id: getId(),
        //type: 'CustomResizerNode',
        type: `${type=='Disponivel'? 'ResizeRotateD' : type=='Reservado'? 'ResizeRotateR': type=='Em Venda'? 'ResizeRotateEV': 'ResizeRotateV'}`,
        position,
        data: { label: `Status\n${type}` },
        style: {                    
          fontSize: 12,
          //border: '1px solid black',
          padding: 5,
          borderRadius: 15,
          height: 50,
          width:5,
          color:'black',          
        },
        parentNode:'1',
      };
      
      

      setNodes((nds) => nds.concat(newNode));
    },
    [rfInstance]
  );

  return (
    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setRfInstance}

      defaultNodes={initialNodes}
      defaultEdges={initialEdges}
      className="react-flow__edge-path"
      minZoom={0.2}
      maxZoom={4}
      fitView
      nodeTypes={nodeTypes}            
      onDrop={onDrop}
      onDragOver={onDragOver}      
    >


   
      <Background variant={BackgroundVariant.Dots} />
      <MiniMap />
      <Controls />
    
      <DownloadButton /> 
      <Panel position="top-right">
        <button onClick={onSave}>save</button>
        <button onClick={onRestore}>restore</button>        
      </Panel>
    </ReactFlow>
    </div>
  );
};

export default function Home() {

  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


  return (
    <div className="dndflow" style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>           
        <SaveRestore /> 
      <Sidebar/>
    </ReactFlowProvider>
    </div>
    
  );
}
//https://reactflow.dev/docs/quickstart/