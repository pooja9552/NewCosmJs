const { DirectSecp256k1HdWallet,DirectSecp256k1HdWalletOptions} = require('@cosmjs/proto-signing');
const { GasPrice, calculateFee } = require('@cosmjs/stargate');
const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate');
const { stringToPath } = require("@cosmjs/crypto");
const fs = require('fs');
const abc=require("@provenanceio/provenance.js")


const sender = {
  mnemonic:
    'guide tortoise crucial tissue soldier ozone stamp west file film stereo mimic slight toddler will cinnamon woman flower special honey clog chicken wink debate',
  // address: 'gemma1adpxt8fn8qev2y3f9lhplzk69vrwgj5dpqzlnj',
  path: "m/44'/1'/0'/0/0'",
};
const contract_address="gemma1487g6w8mq3st4p4a0f643zur6xyfsswrn3rvhajky7wmk0j8zjdqp0qdz3"

async function main() {
  const recipient = '0x4F1536FC181C541f3eF766D227373f55d03CE0bA';
 const wallet= abc.Wallet.fromMnemonic(sender.mnemonic,false)

    // const path = stringToPath(sender.path); // derivation path can be specified here, 330 is coin_type terra station uses. you could also try 118 instead of 330 - cosmos coin_type

  // const wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic, 
  //   // stringToPath(sender.path),
  //   // "tp"
  //   {
  //   prefix: 'tp',
  //   hdPaths: [path]
  // }
  
  // );
  // tp1g996d4xp6kwpwp4tx2hc4hjec9aa39c04pwxaz
  console.log("senderAccount===========",  wallet.getKey(0,1))
// tp1ua9fz57n0upam2l40ydj7vn46v8snpfgxyffj9


//   const rpcEndpoint = 'http://54.163.186.210:26657';
//   const client = await SigningCosmWasmClient.connectWithSigner(
//     rpcEndpoint,
//     wallet,
//     { prefix: 'gemma', gasPrice: '0gxt' }
//   );

//  let random =  Math.floor(Math.random() * 5)
//  console.log("Random Number: ", random);

//   // const wasm = fs.readFileSync('./contracts/erc20/target/wasm32-unknown-unknown/release/cw_erc20.wasm');
//   // console.log('Got it', Boolean(wasm));

//   const gasPrice = GasPrice.fromString('0gxt');
//   const executeFee = calculateFee(300000, gasPrice);
//   const result = await client.execute(
//     sender.address,
//     contract_address,
//     {
//       // approve: {
//       //   spender: recipient,
//       //   amount: '1001',
//       // },

//       // transfer: {
//       //   recipient: recipient,
//       //   amount: '1000',
//       // },
//       recieved_e2_g: {
//         recipient:"gemma1adpxt8fn8qev2y3f9lhplzk69vrwgj5dpqzlnj",
//         // recipient: "gemma1lxk0xd3qwrg20ewwkk2374c7jgjq8eu7n7uhdz",
//          nonce: String(random),
//       },
//       // mint: {
//       //   recipient: "wasm1tv573nsp5fj9ksd2muwqmwn82jv8gf48wm3xd3",
//       //   amount: '1000',
//       // },
    

//       // transfer_from: {
//       //   owner: 'wasm1tv573nsp5fj9ksd2muwqmwn82jv8gf48wm3xd3',
//       //   recipient: 'wasm14u97wl8dravh9l72jt7p763zccxlwyzl9kuudl',
//       //   amount: '0',
//       // },

//       // burn: {
//       //   owner: 'wasm1tv573nsp5fj9ksd2muwqmwn82jv8gf48wm3xd3',
//       //   amount: '100',
//       // },
//     },
//     executeFee
//   );

//   // const wasmEvent = result.logs[0].events.find((e) => e.type === 'wasm');
//   // console.log(
//   //   'The `wasm` event emitted by the contract execution:',
//   //   wasmEvent
    
//   // );
//   const hash=result.transactionHash
// console.log("Transaction hash : ",hash)

  
}

main();