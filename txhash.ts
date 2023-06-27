import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { pubkeyToAddress, Tendermint37Client } from "@cosmjs/tendermint-rpc";
import { fromBase64, toHex } from "@cosmjs/encoding";
import { anyToSinglePubkey } from "@cosmjs/proto-signing";
import { QueryClient, setupStakingExtension } from "@cosmjs/stargate";
import { assert } from "@cosmjs/utils";
import { bech32 } from "bech32";



class CosmJsRpcMethods {
    private client: any;
    private tendermintClient: any;
    private rpUrl: string = "ws://localhost:26657";
    private txHash: string = "958BCDA7BA8EC5A03B0FF823A4ED47A4ECD40056D41C2ED369B49DB87A2646F2";
    private blockNumber: number = parseInt("7940");
    private bech32PrefixAccAddr = "wasm";

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
            // const response = await this.client.getHeight();
            const response = await this.client.getBlock(7940);
            return response;
        } catch (err) {
            console.log("errrorr==", err);
            return err;
        }
    }

    public async getFullBlockInfo() {
        try {
            this.client = await SigningCosmWasmClient.connect(this.rpUrl);
            const response = await this.client.queryClient.tmClient.block(this.blockNumber);
            //  const address = toHex(response.block.header.proposerAddress).toUpperCase();
            // console.log("addr",address);
            return response;
        } catch (err) {
            console.log("errrorr==", err);
            return err;
        }
    }

    public async getAllBlockValidator() {
        try {
            this.tendermintClient = await Tendermint37Client.connect(this.rpUrl);
            const response = await this.tendermintClient.validatorsAll();
            const address = toHex(response.validators[0].address).toUpperCase();
            console.log("cscs", address);
            response.newParameter = address
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

    public async getTendermintValidatorAddressToValoperAddress() {
        try {
            this.tendermintClient = await Tendermint37Client.connect(this.rpUrl);
            console.log("client:", await this.tendermintClient.status());
            const chainHeight = (await this.tendermintClient.status()).syncInfo.latestBlockHeight;
            console.log("height===", chainHeight);
            /** Map from proposer address to number of proposed blocks */
            const proposedBlocks = new Map<string, number>();
            // Top is the value after than the next request's maximum
            let top = chainHeight + 1;
            let headersCount = 0;
            // CSV header
            console.log("height,proposer,num_txs,gas_used,gas_wanted");
            const queryClient = QueryClient.withExtensions(this.tendermintClient, setupStakingExtension);
            const tendermintToOperator = new Map<string, string>();
            let nextKey: Uint8Array | undefined;
            do {
                console.log(`Load validators page ...`);
                const res = await queryClient.staking.validators("BOND_STATUS_BONDED", nextKey);
                res.validators.forEach((r) => {
                    assert(r.consensusPubkey);
                    const pubkey = anyToSinglePubkey(r.consensusPubkey);
                    const address = pubkeyToAddress("ed25519", fromBase64(pubkey.value));
                    tendermintToOperator.set(address, r.operatorAddress);
                })
                nextKey = res.pagination?.nextKey;
            } while (nextKey?.length)

            console.log(`Total blocks scanned: ${headersCount} (from ${chainHeight} to ${top})`);
            const res = await this.tendermintClient.validatorsAll(chainHeight);
            for (const val of res.validators) {
                const address = toHex(val.address).toUpperCase();
                console.log(`address:${address},votingPower:${val.votiaddressngPower},tendermintToOperator:${tendermintToOperator.get(address) ?? "?"},proposedBlocks:${proposedBlocks.get(address) ?? 0}`);
            }
            return "succesfully==============";
        } catch (err) {
            console.log("errrorr==", err);
            return err;
        }
    }


    public async getDelegatorAddress(operatorAddr: string) {
        try {
            let address = await bech32.decode(operatorAddr);
            let delegatorAddress = await bech32.encode(this.bech32PrefixAccAddr, address.words);
            return delegatorAddress;
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
    const getTendermintValidatorAddressToValoperAddress = await methods.getTendermintValidatorAddressToValoperAddress();
    const getDelegator = await methods.getDelegatorAddress("wasmvaloper10lkpzllesrz0yrnlmcn0dplnetr7da9j85g34x");

    // console.log("transaction Data============", transactionData);
    // console.log("Block Data============", blockData);
    // console.log("Full Block Data==========", fullblockInfo);
    // console.log("All Validators=========", validators);
    // console.log("Block Rewards=========", rewards);
    // console.log("Node Health=========", health);
    // console.log("Node Status=========", status);
     //console.log("getTendermintValidatorAddressToValoperAddress=========", getTendermintValidatorAddressToValoperAddress);
     console.log("The converted address is:", getDelegator);

})();
export default new CosmJsRpcMethods()