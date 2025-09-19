import React, { useState, useEffect } from 'react';

// Shuffle array utility
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const calculateMatches = (numTeams) => {
  return Math.ceil(numTeams / 2);
};

const generateInitialMatches = (teams) => {
  const matches = [];
  for (let i = 0; i < teams.length; i += 2) {
    const teamA = teams[i];
    const teamB = teams[i + 1] || null;
    matches.push({
      teamA,
      teamB,
      winner: teamB === null ? teamA : null, // auto-advance BYE
    });
  }
  return matches;
};

const generateNextRound = (prevRound) => {
  const winners = prevRound.map((match) => match.winner).filter(Boolean);
  return generateInitialMatches(winners);
};

const TourneyBracket = ({ tournamentName }) => {
  const [rounds, setRounds] = useState([]);
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [mode, setMode] = useState('');
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [bracketStarted, setBracketStarted] = useState(false);
  const [numTeams, setNumTeams] = useState(0);
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    const teamObj = JSON.parse(localStorage.getItem(tournamentName));
    let teams = teamObj?.teamNames || [];
    let mode = teamObj?.mode || 'random';
    setMode(mode);
    setNumTeams(teams.length);
    setTeamList(teams);
    if (mode === 'random' && teams.length > 1) {
      teams = shuffleArray(teams);
      setRounds([generateInitialMatches(teams)]);
      setCurrentRoundIdx(0);
      setBracketStarted(true);
    }
    if (mode === 'manual' && teams.length > 1) {
      setSelectedTeams(Array(teams.length).fill(''));
    }
  }, [tournamentName]);

  // Helper to get available teams for a select slot
  const getAvailableTeams = (idx) => {
    return teamList.filter(
      (team) => !selectedTeams.includes(team) || selectedTeams[idx] === team
    );
  };

  // Handle team selection for manual mode
  const handleTeamSelect = (idx, value) => {
    const updated = [...selectedTeams];
    updated[idx] = value;
    setSelectedTeams(updated);
  };

  // Validate manual selection
  const isManualValid = () => {
    const filled = selectedTeams.every((t) => t);
    const unique = new Set(selectedTeams).size === selectedTeams.length;
    return filled && unique;
  };

  // Start bracket in manual mode
  const handleStartBracket = (e) => {
    e.preventDefault();
    if (!isManualValid()) return;
    setRounds([generateInitialMatches(selectedTeams)]);
    setCurrentRoundIdx(0);
    setBracketStarted(true);
  };

  const handleWinnerSelect = (matchIdx, winner) => {
    const updatedRounds = [...rounds];
    updatedRounds[currentRoundIdx][matchIdx].winner = winner;
    setRounds(updatedRounds);

    // If all matches in current round have winners, generate next round
    const allSelected = updatedRounds[currentRoundIdx].every((m) => m.winner);
    if (allSelected && updatedRounds[currentRoundIdx].length > 1) {
      const nextRound = generateNextRound(updatedRounds[currentRoundIdx]);
      setRounds([...updatedRounds, nextRound]);
      setCurrentRoundIdx(currentRoundIdx + 1);
    }
  };

  const handleClick = () => {
    localStorage.removeItem(tournamentName);
    window.location.reload();
  };

  return (
    <div className="bracket-container">
      {mode === 'manual' && !bracketStarted && (
        <form onSubmit={handleStartBracket} className="manual-select-form">
          <h3>Assign Teams to Matches</h3>
          {[...Array(calculateMatches(numTeams))].map((_, idx) => (
            <div key={idx} className="manual-match-select">
              <select
                value={selectedTeams[idx * 2] || ''}
                onChange={(e) => handleTeamSelect(idx * 2, e.target.value)}
              >
                <option value="">Select Team</option>
                {getAvailableTeams(idx * 2).map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
              <span>vs</span>
              <select
                value={selectedTeams[idx * 2 + 1] || ''}
                onChange={(e) => handleTeamSelect(idx * 2 + 1, e.target.value)}
              >
                <option value="">Select Team</option>
                {getAvailableTeams(idx * 2 + 1).map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button type="submit" disabled={!isManualValid()}>
            Start Tournament
          </button>
        </form>
      )}
      {bracketStarted &&
        rounds.map((round, roundIdx) => (
          <div key={roundIdx} className="bracket-round">
            <h3>Round {roundIdx + 1}</h3>
            {round.map((match, matchIdx) => (
              <div key={matchIdx} className="bracket-match">
                <span>{match.teamA || 'TBD'}</span>
                <span>vs</span>
                <span>
                  {match.teamB === null ? 'BYE' : match.teamB || 'TBD'}
                </span>
                {match.teamA &&
                  match.teamB &&
                  roundIdx === currentRoundIdx &&
                  !match.winner && (
                    <div>
                      <button
                        onClick={() =>
                          handleWinnerSelect(matchIdx, match.teamA)
                        }
                      >
                        {match.teamA} Wins
                      </button>
                      <button
                        onClick={() =>
                          handleWinnerSelect(matchIdx, match.teamB)
                        }
                      >
                        {match.teamB} Wins
                      </button>
                    </div>
                  )}
                {match.winner && <strong>Winner: {match.winner}</strong>}
              </div>
            ))}
          </div>
        ))}
      {/* Show champion if last round has only one match and winner */}
      {bracketStarted &&
        rounds.length > 0 &&
        rounds[rounds.length - 1].length === 1 &&
        rounds[rounds.length - 1][0].winner && (
          <div className="bracket-champion">
            <h2>Champion: {rounds[rounds.length - 1][0].winner}</h2>
          </div>
        )}
      {bracketStarted && (
        <div className="bracket-end-btn-container">
          <button className="bracket-end-btn" onClick={handleClick}>
            End Tournament
          </button>
        </div>
      )}
    </div>
  );
};

export default TourneyBracket;
