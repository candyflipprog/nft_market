import Web3Utils from "./Web3Utils";

class Api {
    private web3Utils: Web3Utils;

    gas: any;

    constructor() {
        this.web3Utils = new Web3Utils();
        this.gas = 3000000;
    }

    async getNfts() {
        await this.web3Utils.connectToMetaMask();

        const nfts = await this.web3Utils.contractInstance.methods.getNfts().call();

        return nfts;
    };

    async mintCommonNft(name: string) {
        await this.web3Utils.connectToMetaMask();

        const newNft = await this.web3Utils.contractInstance.methods.mintCommonNft(name).send({
            from: await this.web3Utils.contractInstance.methods.owner().call(),
            gas: this.gas
        });

        return newNft;
    };

    async mintCollection(name: string, values: string[]) {
        await this.web3Utils.connectToMetaMask();

        const newCollection = await this.web3Utils.contractInstance.methods.mintCollection(name, values).send({
            from: await this.web3Utils.contractInstance.methods.owner().call(),
            gas: this.gas
        });

        return newCollection;
    };

    async placeNftOnSale(id: bigint, price: bigint) {
        await this.web3Utils.connectToMetaMask();

        const placeNftOnSale = await this.web3Utils.contractInstance.methods.placeNftOnSale(id, price).send({
            from: await this.web3Utils.contractInstance.methods.owner().call(),
            gas: this.gas
        });

        return placeNftOnSale;
    };

    async buyNft(id: bigint, address: string, price: bigint) {
        await this.web3Utils.connectToMetaMask();

        const buyNft = await this.web3Utils.contractInstance.methods.buyNft(id).send({
            from: address,
            gas: this.gas,
            value: price,
        });

        return buyNft;
    }
}

export default Api;
