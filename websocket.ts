import WebSocket from 'websocket';
// import * as WebSocket from 'ws';
import fs from 'fs';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice, calculateFee } from '@cosmjs/stargate';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';

const contract_address_wasm = "wasm14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s0phg4d";

function connect() {
  // Creates new WebSocket object with a wss URI as the parameter
  const socket = new WebSocket.Server("ws://localhost:26657");
//   const socket = new WebSocket('ws://localhost:26657');

  console.log("dscsdc",socket);
//   // Fired when a connection with a WebSocket is opened
//   socket.onopen = function () {
//     socket.send(JSON.stringify({ "jsonrpc": "2.0", "method": "subscribe", "params": ["tm.event='NewBlock'"], "id": 1 }));
//     console.log("Connection open");
//   };

//   // Fired when data is received through a WebSocket
//   socket.onmessage = function (event) {
//     try {
//       const data = JSON.parse(event.data).result;
//       // console.log(data);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   // Fired when a connection with a WebSocket is closed
//   socket.onclose = function () {
//     console.log('Socket is closed. Reconnect will be attempted in 1 second.');
//     setTimeout(function () {
//       connect();
//     }, 1000);
//   };

//   // Fired when a connection with a WebSocket has been closed because of an error
//   socket.onerror = function (event) {
//     console.log("Connection error", event);
//   };
}

connect();
