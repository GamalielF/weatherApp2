import React from 'react';
import Card from './assets/components/Card/Card';
import './index.css';

const App = () => {
  return (
    <div className="gradient-radial min-h-screen h-screen flex justify-start items-center flex-col">
      <Card></Card>
      <p className='mt-3 font-light text-gray-800'>Developed by Fabio Gamaliel S.M &copy;</p>
    </div>
  );
};

export default App;
