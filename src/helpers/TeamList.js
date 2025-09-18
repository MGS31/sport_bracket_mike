import React, { useState, useEffect } from 'react';
import TourneyBracket from '../pages/TourneyBracket';
import './TeamList.css';

const TeamList = ({ tournamentName }) => {
  const [numberOfTeams, setNumberOfTeams] = useState(0);
  const [teamNames, setTeamNames] = useState([]);
  const [showTourneyBracket, setShowTourneyBracket] = useState(false);

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
    localStorage.removeItem(tournamentName);
    localStorage.setItem(tournamentName, JSON.stringify(updatedObj));
    setShowTourneyBracket(true);
  };

  return (
    <>
      {!showTourneyBracket ? (
        <div className="team-list-container">
          <form className="team-list-form" onSubmit={handleSubmit}>
            <div className="dynamic-div-container">
              {Array.from({ length: Number(numberOfTeams) }).map((_, index) => (
                <div key={index}>
                  <label>Team {index + 1} Name:</label>
                  <input
                    type="text"
                    value={
                      Array.isArray(teamNames) ? teamNames[index] || '' : ''
                    }
                    onChange={(e) => handleTeamNameChange(index, e)}
                    required
                  />
                </div>
              ))}
            </div>
            <button type="submit">Submit Teams</button>
          </form>
        </div>
      ) : (
        <TourneyBracket tournamentName={tournamentName} />
      )}
    </>
  );
};

export default TeamList;
