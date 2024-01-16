import React, { useEffect, useState } from 'react'
import { Navbar, Welcome, Footer, Services,Drop,Display,Modal } from "../components";
import ABI from "./ABI.json";
import {ethers} from "ethers";
import { Share } from '@mui/icons-material';
function Storage() {

    const[account , setAccount] = useState('');
    const[contract , setContract] = useState(null);
    const[provider , setProvider] = useState(null);
    const[modalOpen , setModalOpen] = useState(false);

    useEffect(()=>{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
       
        const wallet = async()=>{
            if(provider){
                await provider.send("eth_requestAccounts", []);

                window.ethereum.on("chainChanged", () => {window.location.reload();});
                window.ethereum.on("accountschanged", () => {window.location.reload();});

                const signer = provider.getSigner();
                const address = await signer.getAddress();

                console.log(address);
                setAccount(address);

                let contractAddress = "0xedb7D01579dC76B7AABddA4C0b2F7167412d12ad";
                let abi = ABI;

                const contract = new ethers.Contract(contractAddress, abi, signer);

                console.log(contract);

                setContract(contract);
                setProvider(signer);

            }else{
                alert("metamask is not installed");
            }
        }
        provider && wallet();
    },[])


  return (
    <div className="min-h-screen ">
    <div className="gradient-bg-welcome position-relative">
      <Navbar account={account} display={true}/>
      <Drop account={account} contract={contract} />
      <Display  account={account} contract={contract}/> 

      {!modalOpen && (
  <button
    className="btn text-light p-3 blue-glassmorphism hover:bg-gray-700 rounded-5 position-fixed bottom-0 end-0 m-3"
    onClick={() => setModalOpen(true)}
  >
    <Share />
  </button>
)}

{modalOpen && (
  <Modal account={account} contract={contract} setModalOpen={setModalOpen} />
)}

    </div>
    <div className="gradient-bg-services">
  
      <Footer />
    </div>
  
  </div>
  )
}

export default Storage
