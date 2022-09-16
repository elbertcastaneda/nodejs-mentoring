import crypto from 'crypto';

export interface Password {
  hash: string;
  salt: string;
}

const getRandomSalt = () => crypto.randomBytes(128).toString('hex');

export const generateHash = (plainPassword: string, salt: string = getRandomSalt()): Password => {
  const hash = crypto.createHmac('sha256', salt).update(plainPassword).digest('hex');
  return { hash, salt };
};

export const compareHash = (plainPassword: string, { hash, salt }: Password) => {
  return generateHash(plainPassword, salt).hash === hash;
};
