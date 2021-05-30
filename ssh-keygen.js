const NodeRSA = require('node-rsa');
const key = new NodeRSA();
 
key.generateKeyPair(2048, 65537);
console.log(key.exportKey('openssh'));
console.log(key.exportKey('openssh-public'));
