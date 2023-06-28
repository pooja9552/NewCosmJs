import { GasPrice, calculateFee } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Tendermint37Client } from "@cosmjs/tendermint-rpc";

class contractJS {
private client: any;
  private rpUrl: string = "ws://localhost:26657";
  private mnemonic: string = "dignity warm witness lobster say rude risk mercy receive fabric feel hip merry crash easily cover throw alter spider fiction owner convince prevent jaguar";
  private contract_address: string = "wasm14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s0phg4d";


  public async mint(cosmWasmClient: any, wallet: any, amount: string, address: string): Promise<any> {
    try {
      // const wallet = await DirectSecp256k1HdWallet.fromMnemonic(this.mnemonic, { prefix: 'wasm' });
      const senderAddress = (await wallet.getAccounts())[0].address;
      // console.log("csdcsd",address)

      const gasPrice = GasPrice.fromString('0stake');
      const executeFee = calculateFee(300000, gasPrice);
        // const tmClient = await Tendermint37Client.connect(this.rpUrl);
      //  this.client = await SigningCosmWasmClient.createWithSigner(tmClient, wallet);

      // console.log("cdscdscdsc========",this.client);
      const response = await cosmWasmClient.execute(
        senderAddress,
        this.contract_address,
        {
          mint: {
            recipient: address,
            amount: amount,
          },
        },
        executeFee
      );

      return response;
    } catch (err) {
      console.log("error:", err);
      return err;
    }
  }
  public async query(cosmWasmClient: any, address: string) {
    try {

        // sending an query instruction to the contract
        const response = await cosmWasmClient.queryContractSmart(
            this.contract_address,
            {
                balance: {
                    address: address,
                },
            },
        )

        return response
    } catch (err) {
        console.log("query error ==", err)
        return err
    }
}
 
  
}


// const rpcMethods = new CosmJsRpcMethods2();
// rpcMethods.mint()
//   .then((response) => console.log(response))
//   .catch((error) => console.log("error:", error));

  export default new contractJS()
