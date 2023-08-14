import React, { useEffect, useState, useRef } from 'react';
import { Handle, Position, useUpdateNodeInternals, NodeResizer } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

import styles from './style.module.css';

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
          backgroundColor: '#AFFFAD'
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
              resizable
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={rotatable}
                onChange={(evt) => setRotatable(evt.target.checked)}
              />
              rotatable
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={disponivel}
                onChange={(evt) => setDisponivel(evt.target.checked)}
              />
              Disponível
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={emVenda}
                onChange={(evt) => setEmVenda(evt.target.checked)}
              />
              Em venda
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={vendido}
                onChange={(evt) => setVendido(evt.target.checked)}
              />
              Vendido
            </label>
          </div>
        </div>
        <Handle style={{ opacity: 0 }} position={sourcePosition} type="source" />
        <Handle style={{ opacity: 0 }} position={targetPosition} type="target" />
      </div>
    </>
  );
}
