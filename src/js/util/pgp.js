import Promise from "bluebird";
import openpgp from "openpgp";

export function generateKey({name, email, numBits = 4096}) {
  if (typeof name !== 'string' || name.length === 0) {
    return Promise.reject(new Error('Invalid name'));
  }

  if (typeof email !== 'string' || email.length === 0) {
    return Promise.reject(new Error('Invalid e-mail'));
  }

  if (numBits !== 2048 && numBits !== 4096) {
    return Promise.reject(new Error('Non-standard number of bits'));
  }

  return new Promise((resolve, reject) => {
    openpgp.generateKey({userIds: [{name, email}], numBits})
      .then((key)=> {
        const {privateKeyArmored, publicKeyArmored} = key;
        resolve({privateKeyArmored, publicKeyArmored});
      }, (err) => {
        reject(new Error(`Failed to generate key for ${name} ${email} with length ${numBits}`));
      });
  });
}