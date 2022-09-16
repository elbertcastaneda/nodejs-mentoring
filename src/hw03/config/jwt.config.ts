import fs from 'fs/promises';
import { dirname } from 'path';
import NodeRSA from 'node-rsa';
import { Algorithm } from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';
import { logger } from '_utils';

const issuerHost = process.env.WEBSERVER_VIRTUAL_HOST || 'localhost';
const issuerPort = process.env.WEBSERVER_PORT || 6000;

export interface Keys {
  privateKeyContent: Buffer;
  publicKeyContent: Buffer;
}

const existFile = async (file: string): Promise<boolean> => {
  return fs.access(file).then(
    () => true,
    () => false
  );
};

export const createPrivateKey = async (pathPrivateFile: string): Promise<void> => {
  const pathPublicFile = pathPrivateFile.replace(/.key/, '.pub');

  const exist = await existFile(pathPrivateFile);

  if (!exist) {
    logger.info(`Creating keys: ${pathPrivateFile}`);

    const pathPrivate = dirname(pathPrivateFile);
    const key = new NodeRSA({ b: 4096 });
    const createPrivate = key.exportKey('private');

    await fs.mkdir(pathPrivate, { recursive: true });
    await fs.writeFile(pathPrivateFile, createPrivate);
    const createPublic = key.exportKey('public');

    await fs.writeFile(pathPublicFile, createPublic);
    logger.info(`Keys: ${pathPrivateFile} and .pub created`);
  }
};

export const readPrivateKey = async (pathPrivateFile: string): Promise<Keys> => {
  const pathPublicFile = pathPrivateFile.replace(/.key/, '.pub');
  const exist = await existFile(pathPrivateFile);

  if (!exist) {
    throw new Error("Private key files doesn't exist");
  }

  const privateKeyContent = await fs.readFile(pathPrivateFile);
  const publicKeyContent = await fs.readFile(pathPublicFile);

  return {
    privateKeyContent,
    publicKeyContent,
  };
};

export const createAndReadPrivateKey = async (pathPrivateFile: string): Promise<Keys> => {
  await createPrivateKey(pathPrivateFile);

  return readPrivateKey(pathPrivateFile);
};

const getJwtConfig = (keys: Keys) => {
  const { privateKeyContent, publicKeyContent } = keys;

  return {
    algorithms: ['RS256'],
    issuer: `${issuerHost}:${issuerPort}`,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    maxAge: '365d',
    privateKeyContent,
    secretOrKey: publicKeyContent,
    signOptions: { algorithm: 'RS256' as Algorithm },
  };
};

export default getJwtConfig;
