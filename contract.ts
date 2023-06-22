import { GasPrice, calculateFee } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Tendermint37Client } from "@cosmjs/tendermint-rpc";

class CosmJsRpcMethods {
private client: any;
  private rpUrl: string = "ws://localhost:26657";
  private mnemonic: string = "dignity warm witness lobster say rude risk mercy receive fabric feel hip merry crash easily cover throw alter spider fiction owner convince prevent jaguar";
  private contract_address: string = "wasm14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s0phg4d";


  public async mint(): Promise<any> {
    try {
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(this.mnemonic, { prefix: 'wasm' });
      const address = (await wallet.getAccounts())[0].address;
      console.log("csdcsd",address)

      const gasPrice = GasPrice.fromString('0stake');
      const executeFee = calculateFee(300000, gasPrice);
        const tmClient = await Tendermint37Client.connect(this.rpUrl);
       this.client = await SigningCosmWasmClient.createWithSigner(tmClient, wallet);

      console.log("cdscdscdsc========",this.client);
      const response = await this.client.execute(
        address,
        this.contract_address,
        {
          mint: {
            recipient: "wasm10lkpzllesrz0yrnlmcn0dplnetr7da9jjgadmu",
            amount: '1000',
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
}

const rpcMethods = new CosmJsRpcMethods();
rpcMethods.mint()
  .then((response) => console.log(response))
  .catch((error) => console.log("error:", error));
