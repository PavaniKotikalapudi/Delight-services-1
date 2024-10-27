import React from 'react';

function Dashboard({ role }) {
  return (
    <div className="dashboard">
      <h2>Welcome, {role}!</h2>
      {role === 'Admin' && <p>Hello I am Admin</p>}
      {role === 'User' && <p>Hello i am User</p>}
      {role === 'Guest' && <p>Hello I am a guest</p>}
    </div>
  );
}

export default Dashboard;
