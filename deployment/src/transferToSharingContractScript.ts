import transferOwnership from './singleFunction/transferOwnership.js';
import { getIExec } from './utils/utils.js';

const main = async () => {
  const {
    WALLET_PRIVATE_KEY,
    APP_ADDRESS, // env value override
    DATAPROTECTOR_SHARING_ADDRESS, // env value override
    RPC_URL,
  } = process.env;

  if (!WALLET_PRIVATE_KEY)
    throw Error(`missing privateKey in WALLET_PRIVATE_KEY`);

  if (!RPC_URL)
    throw Error(`missing env RPC_URL`);

  const iexec = getIExec(WALLET_PRIVATE_KEY, RPC_URL);

  const txHash = await transferOwnership(
    iexec,
    APP_ADDRESS,
    DATAPROTECTOR_SHARING_ADDRESS
  );
  if (!txHash)
    throw Error(
      `Failed to transfer ownership of the dapp ${APP_ADDRESS} to ${DATAPROTECTOR_SHARING_ADDRESS}`
    );
};

main().catch((e) => {
  console.log(e);
  process.exit(1);
});
