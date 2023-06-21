
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { Tendermint37Client } from "@cosmjs/tendermint-rpc";

class CosmJsRpcMethods {
    private client: any;
    private tendermintClient: any;
    private rpUrl:string = "http://localhost:26657";
    private txHash:string = "19C061131C65F093A3EDFD5A4F7C86C9B83BF94B5F9B813B83CDC50D66CE14C1";
    private blockNumber:number = parseInt("64");

    public async getTransaction() {
        try {
            this.client = await SigningCosmWasmClient.connect(this.rpUrl);
            const response = await this.client.queryClient.tx.getTx(this.txHash)
            return response;
        } catch (err) {
            console.log("errrorr==", err);
            return err;
        }
    }

    public async getBlockData() {
        try {
            this.client = await SigningCosmWasmClient.connect(this.rpUrl);
            const response = await this.client.getBlock(this.blockNumber);
            return response;
        } catch (err) {
            console.log("errrorr==", err);
            return err;
        }
    }

    public async getFullBlockInfo() {
        try {
            this.client = await SigningCosmWasmClient.connect(this.rpUrl);
            const response = await this.client.queryClient.tmClient.block(this.blockNumber)
            return response;
        } catch (err) {
            console.log("errrorr==", err);
            return err;
        }
    }

    public async getAllBlockValidator() {
        try {
            this.tendermintClient = await Tendermint37Client.connect(this.rpUrl);
            const response = await this.tendermintClient.validatorsAll()
            return response;
        } catch (err) {
            console.log("errrorr==", err);
            return err;
        }
    }

    public async getBlockRewards() {
        try {
            this.tendermintClient = await Tendermint37Client.connect(this.rpUrl);
            const response = await this.tendermintClient.blockResults(this.blockNumber);
            return response;
        } catch (err) {
            console.log("errrorr==", err);
            return err;
        }
    }

    public async getHealth() {
        try {
            this.tendermintClient = await Tendermint37Client.connect(this.rpUrl);
            const response = await this.tendermintClient.health();
            return response;
        } catch (err) {
            console.log("errrorr==", err);
            return err;
        }
    }

    public async getStatus() {
        try {
            this.tendermintClient = await Tendermint37Client.connect(this.rpUrl);
            const response = await this.tendermintClient.status();
            return response;
        } catch (err) {
            console.log("errrorr==", err);
            return err;
        }
    }


   
}

const methods = new CosmJsRpcMethods();

(async () => {
    const transactionData = await methods.getTransaction();
    const blockData = await methods.getBlockData();
    const fullblockInfo = await methods.getFullBlockInfo();
    const validators = await methods.getAllBlockValidator();
    const rewards = await methods.getBlockRewards();
    const health = await methods.getHealth();
    const status = await methods.getStatus();
    console.log("transaction Data============", transactionData);
    console.log("Block Data============", blockData);
    console.log("Full Block Data==========", fullblockInfo);
    console.log("All Validators=========", validators);
    console.log("Block Rewards=========", rewards);
    console.log("Node Health=========", health);
    console.log("Node Status=========", status);
})();