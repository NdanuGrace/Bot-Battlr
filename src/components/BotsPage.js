import React, { useEffect, useState } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage() {
  
  const [allBots, setBots] = useState([]);
  const [listedBots, setlistedBots] = useState([]);
  const [currentBot, setCurrentBot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllBots = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8002/bots');
        const responseData = await response.json();
        setBots(responseData);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    getAllBots();
  }, [])

  const deleteBot = async (botId) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8002/bots/${botId}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'accept': 'application/json' } });
      if(!response.ok){
        throw new Error('Error occured');
      }
      const responseData = await response.json();
      console.log(responseData);
      setCurrentBot(null);
      const inEnlisted = listedBots.find((bot) => bot.id === botId);
      if(inEnlisted){
        setlistedBots(prevBots => prevBots.filter((bot) => bot.id !== botId));
      }
      setBots(prevBots => prevBots.filter((bot) => bot.id !== botId));
    } catch (err) {} finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <YourBotArmy deleteBot={deleteBot} listedBots={listedBots} />
      <BotCollection deleteBot={deleteBot} currentBot={currentBot} setCurrentBot={setCurrentBot} isLoading={isLoading} allBots={allBots} listedBots={listedBots} setlistedBots={setlistedBots} />
    </div>
  )
}

export default BotsPage;
