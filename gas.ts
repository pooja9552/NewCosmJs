import { Tendermint37Client } from "@cosmjs/tendermint-rpc";

async function getGasUsedForBlock(blockHeight: number): Promise<number | undefined> {
  try {
    const rpUrl = "ws://localhost:26657";
    const tendermintClient = await Tendermint37Client.connect(rpUrl);

    const blockResultsResponse = await tendermintClient.blockResults();

    const gasUsed = blockResultsResponse.results?.delivered[blockHeight]?.gasUsed;

    // Return the gas used
    return gasUsed;
  } catch (error) {
    console.error('Error fetching gas used for block:', error);
    return undefined; // Return undefined in case of error
  }
}

async function main() {
  const blockHeight = 12345; // Replace with the block height you want to fetch gas used for
  const gasUsed = await getGasUsedForBlock(blockHeight);

  if (gasUsed !== undefined) {
    console.log(`Gas Used for Block ${blockHeight}: ${gasUsed}`);
  } else {
    console.log(`Failed to fetch Gas Used for Block ${blockHeight}`);
  }
}

main();
