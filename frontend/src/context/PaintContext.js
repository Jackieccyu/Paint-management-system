
import React, { createContext, useState } from 'react';

export const PaintContext = createContext();

export const PaintProvider = ({ children }) => {
    const [paints, setPaints] = useState([]);
  
    return (
      <PaintContext.Provider value={{ paints, setPaints }}>
        {children}
      </PaintContext.Provider>
    );
  };