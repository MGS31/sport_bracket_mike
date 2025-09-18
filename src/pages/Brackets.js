import React from 'react';
import '../App.css';

function Bracket() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Add New Bracket button pushed');
  };

  return (
    <div className="bracket" value={{ color: 'red' }}>
      <h1>
        <button type="submit" onSubmit={handleSubmit}>
          Add New Bracket
        </button>
      </h1>
    </div>
  );
}

export default Bracket;
