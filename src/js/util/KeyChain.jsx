import Promise from "bluebird";
import openpgp from "openpgp";
import localforage from "localforage";

const KeyStore = localforage.createInstance({name: "KeyStore"});

const LOCAL_STORAGE_KEY = 'keys';

const getKeys = () => KeyStore.getItem(LOCAL_STORAGE_KEY);
const setKeys = (keys) => KeyStore.setItem(LOCAL_STORAGE_KEY, keys);

export default class KeyChain {
  static generateKey({name, email, numBits = 4096, passphrase = null}) {
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
      openpgp.generateKey({userIds: [{name, email}], numBits, passphrase})
        .then((key)=> {
          const {privateKeyArmored, publicKeyArmored} = key;
          resolve({privateKeyArmored, publicKeyArmored});
        }, (err) => {
          reject(new Error(`Failed to generate key for ${name} ${email} with length ${numBits}`));
        });
    });
  }

  /**
   * Load keys from the 'keychain'
   */
  static loadKeys() {
    return new Promise((resolve, reject) => {
      getKeys()
        .then((keys) => {
          if (keys) {
            resolve(keys);
          } else {
            resolve([]);
          }
        }, (err) => {
          reject(new Error('Failed to load keys'));
        });
    });
  }

  /**
   * Add a key to the keychain
   * @param privateKeyArmored private key
   * @param publicKeyArmored public key
   * @returns {Promise.<*>}
   */
  static addKey({privateKeyArmored = null, publicKeyArmored = null}) {
    if (privateKeyArmored == null && publicKeyArmored == null) {
      return Promise.reject(new Error('No key specified'));
    }

    if (privateKeyArmored !== null && typeof privateKeyArmored !== 'string') {
      return Promise.reject(new Error('privateKeyArmored must be a string'));
    }

    if (publicKeyArmored !== null && typeof publicKeyArmored !== 'string') {
      return Promise.reject(new Error('publicKeyArmored must be a string'));
    }

    return new Promise((resolve, reject) => {
      KeyChain.loadKeys()
        .then(keys => {
          setKeys(keys.concat([{privateKeyArmored, publicKeyArmored}]))
            .then(
              () => resolve(),
              () => reject(new Error('Failed to set keys into local storage'))
            );
        }, reject);
    });
  }
};