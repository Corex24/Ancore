require('dotenv').config();
const { Client, LocalAuth } = require('@whiskeysockets/baileys');

const client = new Client({
  auth: new LocalAuth(),
  printQRInTerminal: true,
});

client.on('qr', (qr) => {
  console.log('QR code:', qr);
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.initialize();
