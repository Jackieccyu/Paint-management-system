import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserPermissionsContext } from '../context/UserPermissionsContext';
import KanbanBoard from './KanbanBoard';
import UpdateInventoryForm from './UpdateInventoryForm';
import PermissionsControl from './PermissionsControl';

const UserDashboard = () => {
  const { username } = useParams();
  // Use useContext to get userPermissions from UserPermissionsContext
  const { userPermissions } = useContext(UserPermissionsContext); 
  // Make sure to get the permission data from userPermissions by lowercase username
  const permissions = userPermissions[username.toLowerCase()]; 


  if (!permissions) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {permissions.kanbanBoard && <KanbanBoard />}
      {permissions.updateInventoryForm && <UpdateInventoryForm />}
      {permissions.permissionsControl && <PermissionsControl />}
    </div>
  );
};

export default UserDashboard;