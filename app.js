const TelegramBot = require('node-telegram-bot-api');

const token = '654222218:AAEygkbG2tZsI1iQEe_xnuc6_RDdIwh6wGE';
const bot = new TelegramBot(token, { polling: true });
const request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

bot.onText(/\/start/, function (msg) {
  var chatId = msg.from.id;
  bot.sendMessage(chatId, "Привет! Каждый 4 часа я буду отправлять тебе котировки криптовалют по отношению к $$$. Чтобы меня остановить используй /stop");
  var url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,EOS,DOGE,XMR,DASH,SRP,BCH,NEO&tsyms=USD';
  this.interval = setInterval(function(){
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
        var stringMsg = JSON.stringify(cryptomsg, null, 4).replace("[","********************").replace("]","********************");
        bot.sendMessage(chatId,stringMsg);
      }   
    },2000);
  });
bot.onText(/\/stop/, function (msg) {
  var chatId = msg.from.id;
  clearInterval(this.interval);
  xhr.abort();
  bot.sendMessage(chatId, "Хорошо, больше не буду :( Чтобы возобновить используй /start");
});

