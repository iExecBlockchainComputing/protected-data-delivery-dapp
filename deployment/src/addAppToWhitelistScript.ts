import addAppToWhitelist from './singleFunction/addAppToWhitelist.js';
import { getIExec } from './utils/utils.js';

const main = async () => {
  const {
    WALLET_PRIVATE_KEY, // whitelist operator
    APP_ADDRESS, // env value override
    WHITELIST_ADDRESS, // env value override
    RPC_URL,
  } = process.env;

  if (!WALLET_PRIVATE_KEY)
    throw Error(`missing privateKey in WALLET_PRIVATE_KEY`);

  if (!RPC_URL) throw Error(`missing env RPC_URL`);

  if (!APP_ADDRESS) throw Error(`missing env APP_ADDRESS`);

  if (!WHITELIST_ADDRESS) throw Error(`missing env WHITELIST_ADDRESS`);

  const iexec = getIExec(WALLET_PRIVATE_KEY, RPC_URL);

  console.log(
    `adding address ${APP_ADDRESS} to AddOnlyAppWhitelist ${WHITELIST_ADDRESS}`
  );

  await addAppToWhitelist(iexec, WHITELIST_ADDRESS, APP_ADDRESS);
};

main().catch((e) => {
  console.log(e);
  process.exit(1);
});
