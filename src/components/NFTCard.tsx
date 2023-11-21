interface INftCard {
    id: number;
    name: string;
    owner: string;
    img?: string;
    price?: string;
    sale?: string;
};

const NFTCard: React.FC<INftCard> = ({ id, name, owner, img, price, sale }) => {
    return (
        <div className="flex flex-col bg-gray-800 justify-center px-3 py-3 gap-4 rounded-md text-white">
            <span>Id: {id}</span>
            <span>Name: {name}</span>
            <span>Owner: {owner}</span>
            <span>{price}</span>
            <img src={img} alt="nft_img" className="w-32 h-32"/>
            <span>{sale}</span>
        </div>
    )
};

export default NFTCard;
