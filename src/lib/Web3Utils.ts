import { MetaMaskInpageProvider } from "@metamask/providers";
import { Web3 } from "web3";
import abi from "./abi";

class Web3Utils {
    web3Contract: Web3 | undefined;
    contractInstance: any;
    contractAddress: string = "0x1f8bF1a0529618b80e0d50eB64f23d1555dbe6Ce";

    async connectToMetaMask(): Promise<Web3> {
        try {
            type TWindowInjected = Window &
                typeof globalThis & { ethereum: MetaMaskInpageProvider };
            const provider = (window as TWindowInjected).ethereum;

            if (!provider) {
                throw new Error("MetaMask extension not detected. Please install MetaMask.");
            }

            await provider.request({ method: "eth_requestAccounts" });
            this.web3Contract = new Web3(provider);
            this.contractInstance = new this.web3Contract.eth.Contract(abi, this.contractAddress);

            return this.web3Contract;
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
            throw error;
        }
    }
}

export default Web3Utils;
