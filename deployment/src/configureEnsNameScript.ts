import configureEnsName from './singleFunction/configureEnsName.js';
import { getIExec } from './utils/utils.js';

const main = async () => {
  const {
    WALLET_PRIVATE_KEY, // app owner
    APP_ADDRESS, // env value override
    APP_ENS, // env value override
    RPC_URL,
  } = process.env;

  if (!WALLET_PRIVATE_KEY)
    throw Error(`missing privateKey in WALLET_PRIVATE_KEY`);

  if (!RPC_URL) throw Error(`missing env RPC_URL`);

  const iexec = getIExec(WALLET_PRIVATE_KEY, RPC_URL);

  console.log(`configuring ENS ${APP_ENS} for address ${APP_ADDRESS}`);

  await configureEnsName(iexec, APP_ADDRESS, APP_ENS);
};

main().catch((e) => {
  console.log(e);
  process.exit(1);
});
