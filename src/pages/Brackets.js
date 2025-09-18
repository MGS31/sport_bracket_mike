import React, { useState } from 'react';
import '../helpers/TourneyForm.js';
import './Brackets.css';
import TourneyForm from '../helpers/TourneyForm.js';

function Brackets() {
  const [showForm, setShowForm] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
    setShowForm(true);
  };

  return (
    <>
      {!showForm ? (
        <div className="bracket">
          <button className="bracket-button" onClick={handleClick}>
            Add New Tournament
          </button>
        </div>
      ) : (
        <TourneyForm />
      )}
    </>
  );
}

export default Brackets;
