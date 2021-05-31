'use strict';

const {SSHKeyPair} = require('./SSHKeyPair.js');

const start = Date.now();

for (let i = 0; i < 100; i++){
    const new_pair = new SSHKeyPair();
    new_pair.SSHPrivateKey();
    new_pair.SSHPublicKey();
}

console.log(`Generating 100 key pairs takes ${Date.now() - start} ms`);
