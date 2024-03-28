import React, { useState, useEffect } from 'react';

const PermissionsControl = () => {
  const [permissions, setPermissions] = useState({
    John: { view: false, updateEdit: false },
    Jane: { view: false, updateEdit: false },
    Painter: { view: false, updateEdit: false },
  });

  const handleChange = (name, permissionType) => {
    setPermissions({
      ...permissions,
      [name]: {
        ...permissions[name],
        [permissionType]: !permissions[name][permissionType],
      },
    });
  };

  useEffect(() => {
    fetchUsersPermissions();
  }, []);

  const fetchUsersPermissions = async () => {
    try {
      const response = await fetch('https://bcpublicpaint.uc.r.appspot.com/api/users');
      const data = await response.json();
      const permissionsObj = data.reduce((acc, user) => {
        acc[user.name] = { view: user.view, updateEdit: user.permissionedit };
        return acc;
      }, {});
      setPermissions(permissionsObj);
    } catch (error) {
      console.error('Failed to fetch users permissions:', error);
    }
  };

  const [latestUsers, setLatestUsers] = useState([]);

  const handleUpdatePermissions = async () => {
    try {
      const usersToUpdate = Object.keys(permissions).map((name) => ({
        name,
        view: permissions[name].view,
        update: permissions[name].updateEdit,
        permissionedit: permissions[name].updateEdit, // Assuming this should be the same as update
      }));

      const response = await fetch('https://bcpublicpaint.uc.r.appspot.com/api/update-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usersToUpdate),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();
      console.log(result.message);
      
      
      alert('Update successful!');
      setLatestUsers(usersToUpdate); 
    } catch (error) {
      console.error('Failed to update users permissions:', error);
    }
    
  };

  const renderUsersTable = () => {
    return (
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>View</th>
            <th>Update/Edit</th>
          </tr>
        </thead>
        <tbody>
        {latestUsers
            .filter((user) => user.name !== 'Adam') 
            .map((user) => (
            <tr key={user.name}>
              <td>{user.name}</td>
              <td>{user.view ? 'Enable' : 'Disable'}</td>
              <td>{user.update ? 'Enable' : 'Disable'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
    },
    userContainer: {
      marginBottom: '15px',
    },
    title: {
      color: '#333',
    },
    label: {
      marginRight: '10px',
      display: 'inline-block',
      fontWeight: 'bold',
      color: '#666',
    },
    checkbox: {
      marginRight: '5px',
    },
    updateButton: {
      marginTop: '20px',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#007bff',
      color: 'white',
      cursor: 'pointer',
    },
    table: {
        width: '100%',
        marginTop: '20px',
        borderCollapse: 'collapse',
      },
      th: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        backgroundColor: '#f2f2f2',
      },
      td: {
        border: '1px solid #ddd',
        padding: '8px',
      },
  };

  return (
    <div className="container mt-3">
      <h2>Permissions Control</h2>
    <div style={styles.container}>
    {Object.keys(permissions)
          .filter((name) => name !== 'Adam') 
          .map((name) => (
        <div key={name} style={styles.userContainer}>
          <h3 style={styles.title}>{name}</h3>
          <label style={styles.label}>
            <input
              style={styles.checkbox}
              type="checkbox"
              checked={permissions[name].view}
              onChange={() => handleChange(name, 'view')}
            /> View
          </label>
          <label style={styles.label}>
            <input
              style={styles.checkbox}
              type="checkbox"
              checked={permissions[name].updateEdit}
              onChange={() => handleChange(name, 'updateEdit')}
            /> Update/Edit
          </label>
        </div>
      ))}
      <button style={styles.updateButton} onClick={handleUpdatePermissions}>Update Permissions</button>
      {renderUsersTable()}
    </div>
    </div>
  );
};

export default PermissionsControl;