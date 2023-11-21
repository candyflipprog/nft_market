import { useEffect, useState } from "react";
import Api from "../lib/api";
import NFTCard from "./NFTCard";
import nftImg from "../images/image.jpg";
import Web3Utils from "../lib/Web3Utils";

const SalesNfts = () => {
    const [nfts, setNfts] = useState<string[]>([]);
    const [apiInstance, setApiInstance] = useState<Api>();
    const [web3Instance, setWeb3Instance] = useState<any>();
    const [currentAccount, setCurrentAccount] = useState<string>("");

    useEffect(() => {
        const main = async () => {
            const api = new Api();
            const web3Utils = new Web3Utils();
            const web3 = await web3Utils.connectToMetaMask();

            const accounts = await web3.eth.getAccounts();
            setCurrentAccount(accounts[1]);

            const fetchingNfts = await api?.getNfts();

            setNfts(fetchingNfts);

            setApiInstance(api);
            setWeb3Instance(web3);
        };

        main();
    }, []);

    async function onBuyNft(id: bigint, address: string, price: bigint) {
        console.log(id, address, price);
        try {
            const buyNft = await apiInstance?.buyNft(id, address, web3Instance.utils.toHex(price));

            console.log("Buy NFT Transaction:", buyNft);

            return buyNft;

        } catch (error) {
            console.error("Error buying NFT:", error);
        };
    }

    return (
        <div>
            <p>Current Account: {currentAccount}</p>
            {nfts.map((item, idx) => {
                let price = (item[4] as any)?.price;

                return (
                    <div key={idx}>
                        {(item[4] as any)?.isOnSale ? (
                            <div className="flex flex-col gap-2">
                                <NFTCard id={idx} name={item[1]} owner={item[0]} price={String(price)} img={nftImg} />
                                <button
                                    className="bg-zinc-400 text-white px-1 py-1 rounded-md hover:bg-zinc-500"
                                    onClick={() => onBuyNft(BigInt(idx), currentAccount, BigInt(price))}
                                >
                                    Buy NFT
                                </button>
                            </div>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
};

export default SalesNfts;
