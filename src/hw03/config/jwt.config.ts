import fs from 'fs';
import { dirname } from 'path';
import NodeRSA from 'node-rsa';
import passportJWT from 'passport-jwt';
import { logger } from '_utils';

const { ExtractJwt } = passportJWT;

interface Keys {
  privateKeyContent: Buffer,
  publicKeyContent: Buffer
}

function createPrivateKey(pathPrivateFile: string): Keys {
  const pathPublicFile = pathPrivateFile.replace(/.key/, '.pub');

  if (!fs.existsSync(pathPrivateFile)) {
    logger.info(`Creating keys: ${pathPrivateFile}`);

    const pathPrivate = dirname(pathPrivateFile);
    const key = new NodeRSA({ b: 4096 });
    const createPrivate = key.exportKey('private');

    fs.mkdirSync(pathPrivate, { recursive: true });
    fs.writeFileSync(pathPrivateFile, createPrivate);
    const createPublic = key.exportKey('public');

    fs.writeFileSync(pathPublicFile, createPublic);
    logger.info(`Keys: ${pathPrivateFile} and .pub created`);
  }
  logger.info(`Using keys: ${pathPrivateFile}`);

  const privateKeyContent = fs.readFileSync(pathPrivateFile);
  const publicKeyContent = fs.readFileSync(pathPublicFile);

  return {
    privateKeyContent,
    publicKeyContent,
  };
}

const { privateKeyContent, publicKeyContent } = createPrivateKey('.jwt/server.key');
const issuerHost = process.env.WEBSERVER_VIRTUAL_HOST || 'localhost';
const issuerPort = process.env.WEBSERVER_PORT || 5000;
logger.debug(`issuer: '${issuerHost}:${issuerPort}'`);

const jwtConfig = {
  algorithms: ['RS256'],
  issuer: `${issuerHost}:${issuerPort}`,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  maxAge: '365d',
  privateKeyContent,
  secretOrKey: publicKeyContent,
  signOptions: { algorithm: 'RS256' },
};

export default jwtConfig;
