import React, { createContext, useState, useEffect } from 'react';

export const UserPermissionsContext = createContext();

export const UserPermissionsProvider = ({ children }) => {
  const [userPermissions, setUserPermissions] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://bcpublicpaint.uc.r.appspot.com/api/users');
      const users = await response.json();

      
      const permissions = users.reduce((acc, user) => {
        acc[user.name.toLowerCase()] = { 
          kanbanBoard: user.view,
          updateInventoryForm: user.update,
          permissionsControl: user.permissionedit,
        };
        return acc;
      }, {});

      
      setUserPermissions(permissions);
    };

    fetchUsers();
  }, []);

  return (
    <UserPermissionsContext.Provider value={{ userPermissions, setUserPermissions }}>
      {children}
    </UserPermissionsContext.Provider>
  );
};