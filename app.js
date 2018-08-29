const TelegramBot = require('node-telegram-bot-api');
const token = '687793330:AAEzBO2L8KDQODv2awfx4IEv00KLzlSmARA';
const bot = new TelegramBot(token, { polling: true });
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

bot.onText(/\/start/, function (msg) {
  var chatId = "@youcourse";
  //var timer;
  //bot.sendMessage(chatId, "Привет! Каждый 4 часа я буду отправлять тебе котировки криптовалют по отношению к $$$.");
  var url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,EOS,DOGE,XMR,DASH,SRP,BCH,NEO&tsyms=USD';
  setInterval(function (){
  var cryptomsg = [];
      xhr.open('GET', url, false);
      xhr.send();
      if (xhr.status != 200) {
        bot.sendMessage(chatId, xhr.status + ': ' + xhr.statusText); //вывод: 404: Not Found
      } else {
        const data = JSON.parse(xhr.responseText);
        for(var prop in data){
          cryptomsg.push(prop + " : " + data[prop].USD + " $");
        };
        var stringMsg = JSON.stringify(cryptomsg, null, 4).replace("[","Курс криптовалюты").replace("]"," ");
        bot.sendMessage(chatId,stringMsg);
      }
}, 14400000);
  
  });

