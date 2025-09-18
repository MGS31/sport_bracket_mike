import React, { useState } from 'react';

function Tournament_form() {
  const [tournamentName, setTournamentName] = useState('');

  const handleNameChange = (event) => {
    setTournamentName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Optionally, clear the form fields after submission
    setTournamentName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={tournamentName}
          onChange={handleNameChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Tournament_form;
