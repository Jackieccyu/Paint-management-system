import React from 'react';

const PaintCard = ({ paint }) => {
  // Check if the color is white and change the text and border color accordingly
  const isWhitePaint = paint.color.toLowerCase() === 'white';
  const cardStyle = {
    backgroundColor: paint.color,
    color: isWhitePaint ? 'black' : 'white',
    padding: '10px',
    margin: '5px',
    borderRadius: '10px',
    border: isWhitePaint ? '1px solid black' : 'none', // Add black border for white paint
  };

  return (
    <div style={cardStyle} draggable="true">
    <p>Color: {paint.color}</p>
    <p>Quantity: {paint.quantity}</p>
  </div>
  );
};
export default PaintCard;