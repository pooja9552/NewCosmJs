import { Block, SigningStargateClient} from "@cosmjs/stargate"
import { DirectSecp256k1HdWallet} from "@cosmjs/proto-signing"
import { encodeSecp256k1Pubkey, pubkeyToAddress } from '@cosmjs/amino';

const rpc = "localhost:26657"
const mnemonic = "fresh vital toss kick rescue put mask change salt walnut shaft angle plunge final garage size another nuclear run cluster useful chimney sunny north";
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
    console.log("Alice balances:", await client.getAllBalances("wasm1n9cas4mqupw90p7va6cjekjndzvm7rn6s266tm"), )

    // get block data
    const blockHeight = await client.getHeight(); // Replace with the desired block height
    
    const block: Block | null = await client.getBlock(143);
    if (block) {
      console.log('Block Data:', block);
    // console.log( block.txs.toString())
    } else {
      console.log('Block not found');
    }

}

runAll()
