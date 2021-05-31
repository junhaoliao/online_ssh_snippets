const {generateKeyPairSync} = require('crypto');
const {parsePrivateKey, parseKey} = require('sshpk');

class SSHKeyPair {
    constructor() {
        const {publicKey, privateKey}
            = generateKeyPairSync('rsa', {
            modulusLength: 3072,
            publicKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            }
        });
        [this.publicKey, this.privateKey] = [publicKey, privateKey];
    }

    SSHPrivateKey() {
        return parsePrivateKey(this.privateKey, 'pem').toString('ssh-private');
    }

    SSHPublicKey(filename = "") {
        return parseKey(this.publicKey, 'pem', {filename: filename}).toString('ssh');
    }
}

module.exports.SSHKeyPair = SSHKeyPair
