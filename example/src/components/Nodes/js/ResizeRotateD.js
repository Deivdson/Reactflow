import React, { useEffect, useState, useRef } from 'react';
import { Handle, Position, useUpdateNodeInternals, NodeResizer } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

import styles from './style.module.css';
import { Alert } from '@blueprintjs/core';

export default function ResizeRotateNode({
  id,
  sourcePosition = Position.Left,
  targetPosition = Position.Right,
  data,
  
}) {
  const rotateControlRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const [rotation, setRotation] = useState(0);
  const [resizable, setResizable] = useState(true);
  const [rotatable, setRotatable] = useState(true);

  const [disponivel, setDisponivel] = useState(true);
  const [emVenda, setEmVenda] = useState(false);
  const [vendido, setVendido] = useState(false);

  const[status, setStatus] = useState('Disponivel')
  

  useEffect(() => {
    if (!rotateControlRef.current) {
      return;
    }
 

    const selection = select(rotateControlRef.current);
    const dragHandler = drag().on('drag', (evt) => {
      const dx = evt.x - 100;
      const dy = evt.y - 100;
      const rad = Math.atan2(dx, dy);
      const deg = rad * (180 / Math.PI);
      setRotation(180 - deg);
      updateNodeInternals(id);
    });

    selection.call(dragHandler);
  }, [id, updateNodeInternals]);

  return (
    <>
      <div
        style={{
          transform: `rotate(${rotation}deg)`,        
          backgroundColor: `${status=='Disponivel'? '#AFFFAD':status=='Reservado'?'#D4AF37':status=='EmVenda'?'#D3D71F':status=='Vendido'?'#6FBAFF':'#FFFF'}`,
          width:'50%'
        }}
        className={styles.node}
      >
        <NodeResizer isVisible={resizable} minWidth={180} minHeight={100} />
        <div
          ref={rotateControlRef}
          style={{
            display: rotatable ? 'block' : 'none',
          }}
          className={`nodrag ${styles.rotateHandle}`}
        />
        <div>
          {data?.label}
          <div>
            <label>
              <input
                type="checkbox"
                checked={resizable}
                onChange={(evt) => setResizable(evt.target.checked)}
              />
              Tamanho
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={rotatable}
                onChange={(evt) => setRotatable(evt.target.checked)}
              />
              Rotação
            </label>
          </div>

          <select name='select' style={{width:'110%'}}>
            <option onClick={() => {console.log("Disponivel"); setStatus('Disponivel')}} value='1'>Disponível</option>
            <option onClick={() => {console.log("Reservado"); setStatus('Reservado')}} value='2'>Reservado</option>
            <option onClick={() => {console.log("Em Venda"); setStatus('EmVenda')}} selected value='3'>Em venda</option>
            <option onClick={() => {console.log("Vendido"); setStatus('Vendido')}} value='4'>Vendido</option>
          </select>
          <input  placeholder='Código' style={{width:'110%'}}/>

         
        </div>
        <Handle style={{ opacity: 0 }} position={sourcePosition} type="source" />
        <Handle style={{ opacity: 0 }} position={targetPosition} type="target" />
      </div>
    </>
  );
}
