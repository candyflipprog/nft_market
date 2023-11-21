import { useEffect, useState } from "react";
import Api from "../lib/api";

const MintCommonNftMoodal = () => {
    const [name, setName] = useState<string>("");
    const [apiInstance, setApiInstance] = useState<Api>();
    
    useEffect(() => {
        const main = () => {
            const api = new Api();

            setApiInstance(api);
        }

        main();
    }, []);

    const onMintCommonNft = async (name: string) => {
        const commonNft = await apiInstance?.mintCommonNft(name);

        console.log(commonNft);

        return commonNft;
    };

    return (
        <div>
            <input type="text" onChange={(ev) => setName(ev.target.value)} className="border-solid border-2 border-slate-400" />
            <button onClick={() => onMintCommonNft(name)}>Submit</button>
        </div>
    )
};

export default MintCommonNftMoodal;
