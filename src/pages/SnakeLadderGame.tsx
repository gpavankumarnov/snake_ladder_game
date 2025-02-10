import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const SnakeLadderGame = () => {
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 6 + 1);
  };
  const [player, setPlayer] = useState<boolean>(true);
  const [numberDisplay, setNumberDisplay] = useState<number>(0);
  const [playerCount, setPlayerCount] = useState<{
    playerA: number;
    playerB: number;
  }>({
    playerA: 0,
    playerB: 0,
  });

  useEffect(() => {
    if (numberDisplay > 0) {
      playerCountSet(player);
      setPlayer(!player);
      calculateWinner()
    }
  }, [numberDisplay]);

const calculateWinner = () => {
  
  if(playerCount.playerA === 100){
    return  "Player A is winner" 
  } 
  if(playerCount.playerB === 100){
    return  "Player B is winner" 
  } 
   return null;  
}
const winner = calculateWinner();
  /**
      after you roll the dice -> numberDisplay
      you have to update the player count and at the same time you have to 
      check where there is any ladder or snake and update player count.
   */
  const playerCountSet = (player: boolean) => {
    setPlayerCount((prev) => {
      //update the player count
      const getCurrentCount = player ? prev.playerA : prev.playerB;
      let playerCount = getCurrentCount + numberDisplay;

      // Prevent player from exceeding 100
      if (playerCount > 100) {
        playerCount = getCurrentCount;
      }
   
      //check any ladder or snake available
      const newPosition = checkSnakeOrLadderAtPosition(playerCount);

      return {
        ...prev,
        playerA: player ? newPosition : prev.playerA,
        playerB: !player ? newPosition : prev.playerB,
      };
    });
  };

  function checkSnakeOrLadderAtPosition(newPosition: number): number {
    // Snakes and Ladders mapping
    const positions = {
      1: 38,
      4: 14,
      8: 30,
      21: 42,
      28: 76,
      50: 67,
      71: 92,
      80: 99,
      32: 10,
      36: 6,
      48: 26,
      62: 18,
      88: 24,
      95: 56,
      97: 78,
    };

    // Check if player landed on a snake/ladder
    return positions[newPosition] || newPosition;
  }

  const handleRollClick = () => {
    setNumberDisplay(getRandomNumber());
  };
  console.log("playerCount", playerCount);

  return (
    <div className="d-flex flex-column gap-3">
      <h2>Snake-ladder game</h2>
      {winner ? <h3 style={{ color: "green" }}>{winner}</h3> : <h4>Next Player: {player ? "A" : "B"}</h4>}
      <h3>{numberDisplay}</h3>
      {!winner && <Button onClick={handleRollClick}>Roll</Button>}
    </div>
  );
};

export default SnakeLadderGame;
