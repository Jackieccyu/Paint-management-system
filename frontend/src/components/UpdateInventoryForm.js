import React, { useState } from 'react';

const UpdateInventoryForm = ({ onInventoryUpdate }) => {
  const [paintId, setPaintId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [color, setColor] = useState('');
  const [status, setStatus] = useState('');

  // Color to ID mapping
  const colorIdMapping = {
    blue: '66033f78609314612c14955c',
    white: '66033f78609314612c1495a6',
    purple: '66033f78609314612c149616',
    black: '66033f78609314612c1496c2',
    grey: '66033f78609314612c14971b',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://bcpublicpaint.uc.r.appspot.com/api/update-paint/${paintId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: parseInt(quantity, 10), color, status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error updating inventory');
      }

      // Reset form fields
      setPaintId('');
      setQuantity('');
      setColor('');
      setStatus('');
      

      
      window.location.reload();

    } catch (error) {
      // Handle errors, such as by displaying a user-friendly message
      console.error('Failed to update inventory:', error);
    }
  };

  // Update paintId when color is selected
  const handleColorChange = (e) => {
    const selectedColor = e.target.value.toLowerCase();
    setColor(selectedColor);
    const id = colorIdMapping[selectedColor];
    setPaintId(id);
  };

  return (
    <div className="container mt-3 update-inventory-form">
      <h2>Update Paint Inventory</h2>
      <form onSubmit={handleSubmit}>

      <div className="mb-3">
          <label htmlFor="paintColor" className="form-label">Paint Color</label>
          <select
            className="form-select"
            id="paintColor"
            value={color}
            onChange={handleColorChange}
          >
            <option value="">Select Color</option>
            {Object.keys(colorIdMapping).map((colorOption) => (
              <option key={colorOption} value={colorOption}>
                {colorOption.charAt(0).toUpperCase() + colorOption.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="paintQuantity" className="form-label">
            Paint Quantity Change
          </label>
          <input
            type="number"
            className="form-control"
            id="paintQuantity"
            placeholder="Enter quantity change"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="paintStatus" className="form-label">Paint Status</label>
          <select
            className="form-select"
            id="paintStatus"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="available">Available</option>
            <option value="running low">Running Low</option>
            <option value="out of stock">Out of Stock</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Inventory
        </button>
      </form>
    </div>
  );
};

export default UpdateInventoryForm;