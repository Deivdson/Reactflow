import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{color:'black'}}>
      <div className="description">Insira novos lotes no loteamento:</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'Disponivel')} draggable>
        Disponível
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Reservado')} draggable>
        Reservado
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'Em Venda')} draggable>
        Em venda 
      </div>
      <div className="dndnode vendido" onDragStart={(event) => onDragStart(event, 'Vendido')} draggable>
        Vendido
      </div>
    </aside>
  );
};
