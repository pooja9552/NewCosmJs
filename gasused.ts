import { Tendermint37Client } from '@cosmjs/tendermint-rpc';
async function getGasUsedForBlock(blockHeight: number): Promise<number | undefined> {
    try {
      const tmClient = await Tendermint37Client.connect('ws://localhost:26657');
  
      // Fetch the block information
      const { block } = await tmClient.block({ height:  });
  
      // Return the gasUsed value
      return block?.header?.gasUsed;
    } catch (error) {
      console.error('Error fetching gasUsed for block:', error);
    }
  }
  const blockHeight = 12345; // Replace with the desired block height
const gasUsed = await getGasUsedForBlock(blockHeight);

if (gasUsed !== undefined) {
  console.log(`Gas Used for Block ${blockHeight}: ${gasUsed}`);
} else {
  console.log(`Failed to fetch Gas Used for Block ${blockHeight}`);
}
