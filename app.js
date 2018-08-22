const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
// Create a bot that uses 'polling' to fetch new updates
const token = '654222218:AAEygkbG2tZsI1iQEe_xnuc6_RDdIwh6wGE';
const bot = new TelegramBot(token, { polling: true });
const request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();

bot.onText(/\/start/, function (msg) {
  var chatId = msg.from.id;
  bot.sendMessage(chatId, "Привет! Каждый 4 часа я буду отправлять тебе котировки криптовалют по отношению к $$$. Чтобы меня остановить используй /stop");
  var interval = setInterval(function () {
  var url = 'https://api.cryptonator.com/api/ticker/';
  var btc = 'btc-usd';
  var eth = 'eth-usd';
  var ltc = 'ltc-usd';
  var eos = 'eos-usd';
  var doge = 'doge-usd';
  var xmr = 'xmr-usd';
  var dash = 'dash-usd';
  var xrp = 'xrp-usd';
  var bch = 'bch-usd';
  var neo = 'neo-usd';
  var array = [btc, eth, ltc, eos, doge, xmr, dash, xrp, bch, neo];
  var cryptomsg = [];
    array.forEach(function (item, i, array) {
      var requestURL = url + item;
      xhr.open('GET', requestURL, false);
      xhr.send();
      const data = JSON.parse(xhr.responseText);
      cryptomsg.push(item.toUpperCase() + " : " + data.ticker.price);
      }
    });
    if (cryptomsg.length === 10) {
      var stringMsg = JSON.stringify(cryptomsg, null, 4);
      bot.sendMessage(chatId, stringMsg);
    } else {
      bot.sendMessage(chatId, "Что-то пошло не так :(");
    } 
  }, 1000);
});

bot.onText(/\/stop/, function (msg) {
  var chatId = msg.from.id;
  bot.sendMessage(chatId, "Хорошо, больше не буду :( Чтобы возобновить используй /start");
});

