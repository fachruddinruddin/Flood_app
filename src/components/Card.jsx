import React from 'react';

const Card = ({ title, count, icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 hover:bg-blue-50 transition duration-300">
      <div className="text-4xl text-indigo-600">{icon}</div>
      <div>
        <h2 className="text-xl">{title}</h2>
        <p className="text-2xl font-semibold">{count}</p>
      </div>
    </div>
  );
};

export default Card;
