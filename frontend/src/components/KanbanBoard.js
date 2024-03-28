import React, { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PaintContext } from '../context/PaintContext';
import PaintCard from './PaintCard';
import UpdateInventoryForm from './UpdateInventoryForm'; // Corrected import statement
import axios from 'axios';

const KanbanBoard = () => {
  const { paints, setPaints } = useContext(PaintContext);
  const [inventory, setInventory] = useState([]); // State to store inventory data

  const handleDragStart = (event, paintId) => {
    event.dataTransfer.setData("text/plain", paintId);
  };


    // Fetch inventory data from the API
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get('https://bcpublicpaint.uc.r.appspot.com/api/inventory');
        setPaints(response.data); // Update the paints context with the new data
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

  useEffect(() => {

    fetchInventoryData(); // Initial fetch on component mount
    // Fetch inventory data from the API
    axios.get('https://bcpublicpaint.uc.r.appspot.com/api/inventory')
      .then(response => {
        setInventory(response.data); // Set inventory data in state
        setPaints(response.data); // Also populate paints with fetched data
      })
      .catch(error => {
        console.error('Error fetching inventory data:', error);
      });
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;


    const draggedId = result.draggableId;
    const draggedPaint = paints.find(paint => String(paint._id) === draggedId);

    if (!draggedPaint) {
      console.error("Could not find dragged paint with ID:", draggedId);
      return; 
    }
  
   
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      console.log("No movement or same position, no update needed.");
      return;
    }
  
    
  
    const newPaints = Array.from(paints);
    // Remove the dragged item from its original position
    newPaints.splice(source.index, 1);
    // Update the status of the dragged paint before adding it back
    draggedPaint.status = destination.droppableId;
    // Insert the dragged item at its new position
    newPaints.splice(destination.index, 0, draggedPaint);
  
    // console.log("Updated paints array:", newPaints);
    setPaints(newPaints); // Update the state with the new paints array
  };

  return (
    <>

    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board d-flex">
        {['available', 'running low', 'out of stock'].map((status, idx) => (
          <Droppable key={idx} droppableId={status}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="kanban-column"
              >
                <h3 className="status-heading">{status}</h3>
                <div className="paint-list">
                  {inventory.filter(paint => paint.status === status).map((paint, index) => (
                    <Draggable key={String(paint._id)} draggableId={String(paint._id)} index={index} isDragDisabled={paint.quantity === 0}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onDragStart={(e) => handleDragStart(e, paint._id)}
                        >
                          <PaintCard paint={paint} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  </>
);
};

export default KanbanBoard;