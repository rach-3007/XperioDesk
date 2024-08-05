import React from 'react';
import NavBar from '../Shared/NavBar/NavBar'; 

const HomePage: React.FC = () => {
  const username = 'User'; 
  return (
    <div className="homepage">
      <NavBar username={username} />
      <main className="main-content">
        <h1>Welcome to XperioDesk</h1>
      </main>
    </div>
  );
};

export default HomePage;
