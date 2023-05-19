import server from "./server";
import { useState } from "react";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);

    
    const publicKey = secp256k1.getPublicKey(privateKey);
    const address = toHex(keccak256((publicKey.slice(1))).slice(-20))
    console.log(address);
    setAddress(address);
    
  }

  async function onClick() {
    if (address) {
      try {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
      } catch (error) {
        console.error(error);
        // Handle any error that might occur during the API request
        // For example, display an error message to the user
      }
    } else {
      setBalance(0);
    }
    setIsModalOpen(!isModalOpen);
  }

  function ClickCluck() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      {isModalOpen ? (
        <>
          <label>
            Private key
            <input
              placeholder="Provide a private key"
              value={privateKey}
              onChange={onChange}
            ></input>
            <button className="button" onClick={onClick}>
              Confirm
            </button>
          </label>
        </>
      ) : (
        <>
          <label>
            <div>Your wallet address: {address}</div>
            <button className="button" onClick={ClickCluck}>
              Exit
            </button>
          </label>
          <div className="balance">Balance: {balance}</div>
        </>
      )}
    </div>
  );
}

export default Wallet;
