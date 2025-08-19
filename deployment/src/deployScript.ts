import {
  APP_ADDRESS_FILE,
} from '../config/config.js';
import { deployApp } from './singleFunction/deployApp.js';
import { getIExec, saveToFile } from './utils/utils.js';

const main = async () => {
  const {
    RPC_URL,
    WALLET_PRIVATE_KEY,
    DOCKER_IMAGE_TAG,
    CHECKSUM,
    FINGERPRINT,
    SCONIFY_VERSION,
  } = process.env;


  if (!WALLET_PRIVATE_KEY)
    throw Error(`missing privateKey in WALLET_PRIVATE_KEY`);

  const iexec = getIExec(WALLET_PRIVATE_KEY, RPC_URL);

  if (!DOCKER_IMAGE_TAG) {
    throw Error(`Missing DOCKER_IMAGE_TAG environment variable.`);
  }

  let dockerImageTag;

  console.log(`deploying app with docker tag ${dockerImageTag}`);

  const address = await deployApp({
    iexec,
    dockerTag: DOCKER_IMAGE_TAG,
    checksum: CHECKSUM,
    fingerprint: FINGERPRINT,
    sconifyVersion: SCONIFY_VERSION,
  });
  await saveToFile(APP_ADDRESS_FILE, address);
};

main().catch((e) => {
  console.log(e);
  process.exit(1);
});
