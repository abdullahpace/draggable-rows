import React, { useState } from 'react';

const Table = () => {
  const [isolates, setIsolates] = useState([
    {
      id: 100,
      isolatable: {
        id: 1053,
        lab_no: 'PAK-E-24-0061',
      },
    },
    {
      id: 101,
      isolatable: {
        id: 1054,
        lab_no: 'PAK-E-24-0067',
      },
    },
    {
      id: 102,
      isolatable: {
        id: 1055,
        lab_no: 'PAK-E-24-0099',
      },
    },
    {
      id: 103,
      isolatable: {
        id: 1056,
        lab_no: 'PAK-E-24-8888',
      },
    },
    {
      id: 104,
      isolatable: {
        id: 1057,
        lab_no: 'PAK-E-24-9765',
      },
    },
  ]);

  const [draggedId, setDraggedId] = useState(null);

  const handleDragStart = (e, id) => {
    setDraggedId(id);

    const draggedRow = document.getElementById(`row-${id}`);
    if (draggedRow) {
      draggedRow.style.backgroundColor = 'lightblue';
      draggedRow.style.backgroundColor = 'transition 0.3s all';
    }
    // e.target.style.backgroundColor = 'lightblue';
    // e.target.style.backgroundColor = 'transition 0.3s all';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e, id) => {
    e.preventDefault();
    const draggedOverItem = isolates.find((item) => item.id === draggedId);
    if (draggedOverItem.id !== draggedId) {
      const items = isolates.filter((item) => item.id !== draggedId);
      const draggedItem = isolates.find((item) => item.id === draggedId);
      const dropIndex = items.findIndex((item) => item.id === id);
      const updatedItems = [
        ...items.slice(0, dropIndex),
        draggedItem,
        ...items.slice(dropIndex),
      ];
      setIsolates(updatedItems);
    }
  };

  const handleDrop = (e, id) => {
    setDraggedId(null);
    e.preventDefault();
    const droppedItem = isolates.find((item) => item.id === id);
    const draggedItem = isolates.find((item) => item.id === draggedId);
    const draggedRow = document.getElementById(`row-${draggedItem.id}`);
    if (draggedRow) {
      draggedRow.style.backgroundColor = '';
    }

    const updatedItems = isolates.map((item) => {
      if (item.id === id) {
        return draggedItem;
      }
      if (item.id === draggedId) {
        return droppedItem;
      }
      return item;
    });

    setIsolates(updatedItems);
  };

  return (
    <div className='container mt-2'>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Position</th>
            <th>Lab ID</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {isolates?.map((isolate, index) => (
            <tr key={index} id={`row-${isolate.id}`}>
              <td
                draggable='true'
                onDragStart={(e) => handleDragStart(e, isolate.id)}
                onDragOver={(e) => handleDragOver(e, isolate.id)}
                onDrop={(e) => handleDrop(e, isolate.id)}
              >
                {index + 1}
              </td>
              <td>{isolate?.isolatable?.lab_no}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
