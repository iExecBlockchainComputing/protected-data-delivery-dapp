import { APP_WHITELIST_ADDRESS_FILE } from '../config/config.js';
import createAddOnlyAppWhitelist from './singleFunction/createAddOnlyAppWhitelist.js';
import { getIExec, saveToFile } from './utils/utils.js';

const main = async () => {
  const {
    WALLET_PRIVATE_KEY, // future whitelist owner
    DATAPROTECTOR_SHARING_ADDRESS, // env value override
  } = process.env;

  if (!WALLET_PRIVATE_KEY)
    throw Error(`missing privateKey in WALLET_PRIVATE_KEY`);

  const iexec = getIExec(WALLET_PRIVATE_KEY);


  console.log(
    `creating AddOnlyAppWhitelist for DataprotectorSharing ${DATAPROTECTOR_SHARING_ADDRESS}`
  );

  const addOnlyAppWhitelistAddress = await createAddOnlyAppWhitelist(
    iexec,
    DATAPROTECTOR_SHARING_ADDRESS
  );

  await saveToFile(APP_WHITELIST_ADDRESS_FILE, addOnlyAppWhitelistAddress);
};

main().catch((e) => {
  console.log(e);
  process.exit(1);
});
