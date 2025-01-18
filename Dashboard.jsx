import React from 'react';
import { ReactComponent as Logo } from './logo.svg';
import { ReactComponent as Icon } from './icon.svg';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <Logo />
        <h1>Welcome to the Dashboard</h1>
      </header>
      <main className="dashboard-content">
        <Icon />
        <p>This is the main content area.</p>
      </main>
    </div>
  );
};

export default Dashboard;