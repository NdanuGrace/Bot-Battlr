import React from "react";
import BotCard from "./BotCard";
import BotSpecs from "./BotSpecs";

function BotCollection({ deleteBot, isLoading, allBots, listedBots, setlistedBots, currentBot, setCurrentBot }) {

  const addBotToList = (botId, bot) => {
    const foundEnlistedBot = listedBots.find((bot) => bot.id === botId);
    if (foundEnlistedBot) {
      return;
    }
    setlistedBots(prevBots => [...prevBots, bot])
  };

  const handleBotClick = (bot) => {
    setCurrentBot(bot);
  }
  const goBackHandler = () => {
    setCurrentBot(null);
  }

  return (
    <div className="ui four column grid">
      <div className="row">
        {isLoading && <p>Loading...</p>}
        {!isLoading && !currentBot && allBots.map((bot, index) => <BotCard deleteBot={deleteBot} key={index} handleBotClick={handleBotClick} bot={bot}></BotCard>)}
        {!isLoading && currentBot && <BotSpecs goBackHandler={goBackHandler} addBotToList={addBotToList} bot={currentBot}></BotSpecs>}
      </div>
    </div>
  );
}

export default BotCollection;