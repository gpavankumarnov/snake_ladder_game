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

  useEffect(()=>{
   if(numberDisplay >0){
    playerCountSet(player);
    calculateWinner();
    setPlayer(!player);
   }
  },[numberDisplay])

  const calculateWinner = ()=>{
    const playerPositionAfterRoll = play(player ? playerCount.playerA : playerCount.playerB, numberDisplay);
    console.log("player position after roll", playerPositionAfterRoll);

    if(playerPositionAfterRoll){    
    setPlayerCount((prev) => ({
        ...prev,
        playerA:
          player
            ?  playerPositionAfterRoll
            : prev.playerA,
        playerB:
          !player
            ? playerPositionAfterRoll
            : prev.playerB,
      }));
    }
  }

  const playerCountSet = (player: boolean) => {
   
    setPlayerCount((prev) => ({
      ...prev,
      playerA:
        player
          ? prev.playerA + numberDisplay
          : prev.playerA,
      playerB:
        !player
          ? prev.playerB + numberDisplay
          : prev.playerB,
    }));
  
  };

  function play(player:number, numberDisplay:number) {
    // Prevent player from exceeding 100
    if (player > 100) {
        player -= numberDisplay;
    }

    // Snakes and Ladders mapping
    const positions = {
        1: 38,  4: 14,  8: 30,  21: 42,  28: 76,  50: 67,
        71: 92, 80: 99, 32: 10, 36: 6,  48: 26,  62: 18, 
        88: 24, 95: 56, 97: 78
    };

    // Check if player landed on a snake/ladder
    return positions[player];
}


  const handleRollClick = () => {
    
      setNumberDisplay(getRandomNumber());
      
      
    
   
  };
  console.log("playerCount", playerCount);

  return (
    <div className="d-flex flex-column gap-3">
      <h2>Snake-ladder game</h2>
      <h4>Next Player{player ? " A" : " B"}</h4>
      <h3>{numberDisplay}</h3>
      <Button onClick={handleRollClick}>Roll</Button>
    </div>
  );
};

export default SnakeLadderGame;
