import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account is found like this");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("Please Connect Metamask Wallet");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async (walletaddress) => {
    if (atm) {
      alert(walletaddress)
     setBalance((await atm.getBalanceFromWalletAddress(walletaddress)).toNumber());
    }
  };

  const deposit = async () => {
    alert(account)
    if (atm) {
      let tx = await atm.depositamount(15, { gasLimit: 3e7 });
      await tx.wait();
      getBalance(account[0]);
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdrawamount(15, { gasLimit: 3e7 });
      await tx.wait();
      getBalance(account[0]);
    }
  };
  const mintbalance = async () => {
    alert(account)
    if (atm) {
      let tx = await atm.mintbalance(100,{ gasLimit: 3e7 });
      await tx.wait();
      getBalance(account[0]);
    }
  };

  //const decreaseBalance = async () => {
    //if (atm) {
      //let tx = await atm.decreaseBalance(50,{ gasLimit: 3e7 });
      //await tx.wait();
      //getBalance(account[0]);
    //}
  
  // const changeaccount = async () => {
  //   handleAccount([prompt("Enter wallet address")])
  //   getBalance(account[0]);
  // }

  const initUser = () => {
    // Check if user has Metamask
    if (!ethWallet) {
      return <p>You need to install Metamask in order to use this ATM.</p>;
    }

    // Check if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount}
        style={{ backgroundColor: "indigo", color: "yellow" }}
        >
          Connect your Metamask wallet
        </button>
      );
    }

    if (balance == undefined) {
      getBalance(account[0]);
    }

    return (
      <div class="overlay">
  <p class="bold-text">Your Account: {account}</p>
  <p class="bold-text">Your Current Balance is: {balance}</p>
  <button class="deposit-button" onClick={deposit}>Deposit 15 ETH</button>
  <button class="withdraw-button" onClick={withdraw}>Withdraw 15 ETH</button>
  <button class="mint-button" onClick={mintbalance}>Mint Balance OF 100 ETH</button>
</div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
    <header><h1 style={{ backgroundColor: 'black', color: 'white' }}> --- Welcome to the Metacrafters Crypto ATM! ---</h1></header>
    {initUser()}
    <style jsx>{`
      .container {
        text-align: center;
        background-color: blue;
      }
    `}
    </style>
  </main>
);
}; 
