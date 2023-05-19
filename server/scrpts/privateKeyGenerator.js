const secp = require("ethereum-cryptography/secp256k1");
const { toHex } =  require( "ethereum-cryptography/utils.js");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.secp256k1.utils.randomPrivateKey();
const publicKey = secp.secp256k1.getPublicKey(privateKey);


function getAddress(publicKey) {
    const address = keccak256(publicKey.slice(1))
    return address.slice(-20)
}
console.log("Your private key is : ",toHex(privateKey));
console.log("Your public key is : ",toHex(publicKey ));
console.log("Your public address is : ",toHex(getAddress(publicKey)))