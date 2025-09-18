import React, { useState } from 'react';
import './TourneyForm.css';
import TeamList from './TeamList.js';

function TourneyForm() {
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    number: 2,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToStore = {
      ...formData,
      number: Number(formData.number),
    };
    console.log('Form Data:', formData);
    localStorage.setItem(formData.name, JSON.stringify(dataToStore));
    setShowTeamForm(true);
  };

  return (
    <>
      {!showTeamForm ? (
        <div className="tourney-form-container">
          <form className="tourney-form" onSubmit={handleSubmit}>
            <label>
              <h6>Name:</h6>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              <h6>Number:</h6>
              <select
                name="number"
                value={formData.number}
                onChange={handleChange}
              >
                {Array.from({ length: 19 }, (_, i) => i + 2).map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <TeamList tournamentName={formData.name} />
      )}
    </>
  );
}

export default TourneyForm;
