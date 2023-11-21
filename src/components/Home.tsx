import { useEffect, useState } from "react";

import nftImage from "../images/image.jpg";

import Api from "../lib/api";
import Web3Utils from "../lib/Web3Utils";

import Button from "./Button";
import NFTCard from "./NFTCard";
import MintCommonNftMoodal from "./MintCommonNftModal";
import MintCollectionModal from "./MintCollectionModal";
import SalesNfts from "./SalesNfts";

const Home = () => {
    const [web3Instance, setWeb3Instance] = useState<any>();
    const [apiInstance, setApiInstance] = useState<Api>();
    const [accounts, setAccounts] = useState<string[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
    const [currentAccount, setCurrentAccount] = useState<string>("");
    const [balance, setBalance] = useState<string | null>(null);
    const [nfts, setNfts] = useState<string[]>([]);
    const [price, setPrice] = useState<any>(0);
    const [id, setId] = useState<any>();
    const [showMyNft, setShowMyNft] = useState<boolean>(false);
    const [createCommonNftModal, setCreateCommonNftModal] = useState<boolean>(false);
    const [createCollection, setCreateCollection] = useState<boolean>(false);
    const [buyNft, setBuyNft] = useState<boolean>(false);

    useEffect(() => {
        const main = async () => {
            const web3Utils = new Web3Utils();
            const web3 = await web3Utils.connectToMetaMask();
            const api = new Api();
            const fetchedAccounts = await web3.eth.getAccounts();
            const selectedBalance = await web3.eth.getBalance(fetchedAccounts[0]);
            const nfts = await api?.getNfts();

            setAccounts(fetchedAccounts);
            setSelectedAccount(fetchedAccounts[0]);
            setCurrentAccount(fetchedAccounts[0]);
            setBalance(selectedBalance.toString());
            setWeb3Instance(web3);
            setApiInstance(api);
            setNfts(nfts);
        };

        main();
    }, []);


    const handleAccountChange = async (selected: string) => {
        setSelectedAccount(selected);
        const selectedBalance = await web3Instance.eth.getBalance(selected);
        setBalance(selectedBalance.toString());
    };

    const placeNftOnSale = async (id: number, price: number) => {
        const converedPrice = await web3Instance.utils.toWei(price, "ether");
        const nftOnSale = await apiInstance?.placeNftOnSale(BigInt(id), BigInt(converedPrice));


        return nftOnSale;
    };

    console.log("idx | price", id, price);

    return (
        <div className="flex flex-col items-center gap-4">
            <div>
                <select className="px-2 py-2 rounded-md" onChange={(e) => handleAccountChange(e.target.value)} value={selectedAccount || ''}>
                    {accounts.map((item, idx) => (
                        <option key={idx} value={item} onClick={() => setCurrentAccount(item)}>{item}</option>
                    ))}
                </select>
            </div>
            <div>
                <span>Balance: {balance}</span>
            </div>
            <div className="flex gap-4">
                <Button name="My NFT" onClick={() => setShowMyNft(!showMyNft)} />
                <Button name="Create NFT" onClick={() => setCreateCommonNftModal(!createCommonNftModal)} />
                <Button name="Create collection" onClick={() => setCreateCollection(!createCollection)} />
                <Button name="Buy NFT" onClick={() => setBuyNft(!buyNft)} />
            </div>


            {showMyNft ? (
                <div>
                    {nfts.map((item, idx) => (
                        <div key={idx} className="gap-4">
                            {item[0].toString() === currentAccount.toString() ? (
                                <div className="mb-5">
                                    {(item[4] as any)?.isOnSale ? (
                                        <NFTCard
                                            key={idx}
                                            id={idx}
                                            name={item[1]}
                                            owner={item[0]}
                                            img={String(nftImage)}
                                            sale="This NFT is for sale"
                                        />
                                    ) : (
                                        <div>
                                            <NFTCard key={idx} id={idx} name={item[1]} owner={item[0]} img={String(nftImage)} />
                                            <div className="flex flex-col gap-2 mt-2">
                                                <input
                                                    type="number"
                                                    onChange={(ev) => setPrice(Number(ev.target.value))}
                                                    placeholder="Price"
                                                    className="border-solid border-2 border-zinc-300 px-1 py-1"
                                                />
                                                <button
                                                    id={idx.toString()}
                                                    className="bg-zinc-400 text-white px-1 py-1 hover:bg-zinc-500"
                                                    onClick={() => {
                                                        setTimeout(() => {
                                                            placeNftOnSale(idx, price);
                                                        }, 1000);
                                                    }}
                                                >
                                                    Sale
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    ))}
                </div>
            ) : null}

            {createCommonNftModal ? (
                <div>
                    <MintCommonNftMoodal />
                </div>
            ) : null}

            {createCollection ? (
                <MintCollectionModal />
            ) : null}

            {buyNft ? (
                <SalesNfts />
            ) : null}
        </div>
    );
};

export default Home;
