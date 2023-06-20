import { Block, SigningStargateClient} from "@cosmjs/stargate"
import { DirectSecp256k1HdWallet} from "@cosmjs/proto-signing"
import { encodeSecp256k1Pubkey, pubkeyToAddress } from '@cosmjs/amino';

const rpc = "localhost:26657"
const mnemonic = "huge useful lucky online annual fine lend pigeon exhaust enlist ivory reform arm side spoon winter clay okay humor gorilla artefact transfer reunion shrug";
const addressPrefix = 'wasm';

const runAll = async(): Promise<void> => {
    
    // create wallet and get account
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic);
    const [account] = await wallet.getAccounts();
    const signer = wallet;

    console.log("enter");
    
    // creating connection instance
    const client = await SigningStargateClient.connectWithSigner(rpc, signer);

    // get address with prefix
    const publicKey = encodeSecp256k1Pubkey(account.pubkey);
    const address = pubkeyToAddress(publicKey, addressPrefix);
    console.log(address)
    console.log("With client, chain id:", await client.getChainId(), ", height:", await client.getHeight())
    console.log("Alice balances:", await client.getAllBalances("wasm1zujj0h7xadc63ktv8z67q6x5laly67racryeua"), )

    // get block data
    const blockHeight = await client.getHeight(); // Replace with the desired block height
    const block: Block | null = await client.getBlock(blockHeight);
    if (block) {
      console.log('Block Data:', block);
    } else {
      console.log('Block not found');
    }

}

runAll()