import WebSocket from "websocket"
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { Tendermint37Client } from "@cosmjs/tendermint-rpc"
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"
import CosmJsRpcMethods from "./experiment"
import CosmJsRpcMethods2 from "./contract";

async function connect() {

    // Creates new WebSocket object with a wss URI as the parameter
    const socket = new WebSocket.w3cwebsocket("ws://localhost:26657/websocket")
    const rpcUrl: string = "http://localhost:26657" // for localhost
    const mnemonic =
        "dignity warm witness lobster say rude risk mercy receive fabric feel hip merry crash easily cover throw alter spider fiction owner convince prevent jaguar"

    // Fired when a connection with a WebSocket is opened
    socket.onopen = async function () {

        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "wasm" })
        const tendermintClient = await Tendermint37Client.connect(rpcUrl)
        const cosmWasmClient = await SigningCosmWasmClient.createWithSigner(tendermintClient, wallet)

        console.log("connection open")
        CosmJsRpcMethods.blockNumber = await cosmWasmClient.getHeight();
        for (CosmJsRpcMethods.blockNumber;;CosmJsRpcMethods.blockNumber++) {
            try{
            const currentBlock = await cosmWasmClient.getHeight();
            if(CosmJsRpcMethods.blockNumber>currentBlock)
                await delay(4000);
            const blockRewards = await CosmJsRpcMethods.getBlockRewards(tendermintClient);
            const amount = blockRewards.results[0].gasUsed;
            const mintResp = await CosmJsRpcMethods2.mint(cosmWasmClient, wallet, amount);
            console.log(mintResp);
            console.log(CosmJsRpcMethods.blockNumber);
            
            await delay(4000);
            } catch (err) {
                console.log("no transactions in ",CosmJsRpcMethods.blockNumber, " block");
                await delay(4000)
                
            }
        }
    }

    // Fired when a connection with a WebSocket is closed
    socket.onclose = async function () {
        console.log("Socket is closed. Reconnect will be attempted in 1 second.")
        setTimeout(function () {
            connect()
        }, 1000)
    }

    // Fired when a connection with a WebSocket has been closed because of an error
    socket.onerror = async function (event: any) {
        console.log("connection error", event)
    }

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
}

connect()