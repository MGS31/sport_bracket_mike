import React, { useState, useEffect } from 'react';

const TeamForm = ({ tournamentName, onSubmit }) => {
  const [numberOfTeams, setNumberOfTeams] = useState(0);
  const [teamNames, setTeamNames] = useState([]);

  useEffect(() => {
    const teamObj = JSON.parse(localStorage.getItem(tournamentName));
    if (teamObj && teamObj.number) {
      setNumberOfTeams(Number(teamObj.number));
      setTeamNames(Array(Number(teamObj.number)).fill(''));
    }
  }, [tournamentName]);

  const handleTeamNameChange = (index, event) => {
    const newTeamNames = [...teamNames];
    newTeamNames[index] = event.target.value;
    setTeamNames(newTeamNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const teamObj = JSON.parse(localStorage.getItem(tournamentName)) || {};
    const updatedObj = {
      ...teamObj,
      teamNames: [...teamNames],
    };
    localStorage.setItem(tournamentName, JSON.stringify(updatedObj));
    if (onSubmit) onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="dynamic-div-container">
        {Array.from({ length: Number(numberOfTeams) }).map((_, index) => (
          <div key={index}>
            <label>Team {index + 1} Name:</label>
            <input
              type="text"
              value={teamNames[index] || ''}
              onChange={(e) => handleTeamNameChange(index, e)}
              required
            />
          </div>
        ))}
      </div>
      <button type="submit">Submit Teams</button>
    </form>
  );
};

export default TeamForm;
