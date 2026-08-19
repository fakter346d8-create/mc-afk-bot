const mineflayer = require('mineflayer');

const botArgs = {
  host: 'Play.Neonsmp.in  ', 
  port: 25565,            
  username: 'xzyst__',   
  version: false      
};

function initBot() {
  const bot = mineflayer.createBot(botArgs);
  let hasLoggedIn = false;

  bot.on('login', () => {
    console.log(`Bot connected to server as: ${bot.username}`);
  });

  bot.on('move', () => {
    if (bot.entity && bot.entity.onGround && !hasLoggedIn) {
      hasLoggedIn = true;
      console.log("Bot hit the ground safely. Waiting 2 seconds to log in...");
      setTimeout(() => {
        bot.chat('/login ZXSafi1234'); 
        console.log("Sent login command after falling.");
      }, 2000);
    }
  });

  bot.on('spawn', () => {
    console.log("Bot spawned in the world (falling or standing).");
    setInterval(() => {
      if (hasLoggedIn) {
        bot.setControlState('forward', true);
        setTimeout(() => {
          bot.setControlState('forward', false);
          bot.setControlState('back', true);
          setTimeout(() => {
            bot.setControlState('back', false);
          }, 500);
        }, 500);
      }
    }, 15000); 
  });

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 10 seconds...');
    hasLoggedIn = false;
    setTimeout(initBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Error encountered: ', err);
  });
}

initBot();
