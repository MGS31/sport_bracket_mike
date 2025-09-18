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

  useEffect(() => {
    const teamObj = JSON.parse(localStorage.getItem(tournamentName));
    let teams = teamObj?.teamNames || [];
    if (teams.length > 1) {
      teams = shuffleArray(teams);
      setRounds([generateInitialMatches(teams)]);
      setCurrentRoundIdx(0);
    }
  }, [tournamentName]);

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
      {rounds.map((round, roundIdx) => (
        <div key={roundIdx} className="bracket-round">
          <h3>Round {roundIdx + 1}</h3>
          {round.map((match, matchIdx) => (
            <div key={matchIdx} className="bracket-match">
              <span>{match.teamA || 'TBD'}</span>
              <span>vs</span>
              <span>{match.teamB === null ? 'BYE' : match.teamB || 'TBD'}</span>
              {match.teamA &&
                match.teamB &&
                roundIdx === currentRoundIdx &&
                !match.winner && (
                  <div>
                    <button
                      onClick={() => handleWinnerSelect(matchIdx, match.teamA)}
                    >
                      {match.teamA} Wins
                    </button>
                    <button
                      onClick={() => handleWinnerSelect(matchIdx, match.teamB)}
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
      {rounds.length > 0 &&
        rounds[rounds.length - 1].length === 1 &&
        rounds[rounds.length - 1][0].winner && (
          <div className="bracket-champion">
            <h2>Champion: {rounds[rounds.length - 1][0].winner}</h2>
          </div>
        )}
      <div className="bracket-end-btn-container">
        <button className="bracket-end-btn" onClick={handleClick}>
          End Tournament
        </button>
      </div>
    </div>
  );
};

export default TourneyBracket;
