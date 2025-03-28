import { ethers } from "ethers";
import contractABI from "./contractABI.json"; // Import the contract ABI

const contractAddress = "0x9a52C40420935536ce787FD8eA162F8e6821B790"; // Replace with deployed address

export const getContract = async () => {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        return new ethers.Contract(contractAddress, contractABI, signer);
    } else {
        alert("Please install MetaMask!");
        return null;
    }
};
