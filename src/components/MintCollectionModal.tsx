import React, { useState, useEffect } from "react";
import Api from "../lib/api";

const MintCollectionModal = () => {
    const [apiInstance, setApiInstance] = useState<Api>();
    const [name, setName] = useState<string>("");
    const [values, setValues] = useState<string[]>([]);
    const [value, setValue] = useState<string>("");
    const [closeModal, setCloseModal] = useState<boolean>(true);

    useEffect(() => {
        const main = () => {
            const api = new Api();

            setApiInstance(api);
        };

        main();
    }, []);

    const onAddValues = (newValue: string) => {
        setValues([...values, newValue]);
    };

    const onMintCollection = async (name: string, values: string[]) => {
        const newCollection = await apiInstance?.mintCollection(name, values);
        
        return newCollection;
    };

    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-opacity-20 ${closeModal ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center h-full">
                <div className="bg-white p-4 rounded-md shadow-md border-solid border-2 border-slate-400">
                    <div className="flex flex-col gap-4">
                        <input type="text" placeholder="Name" className="border-solid border-2 border-zinc-300 px-2 py-2" onChange={(ev) => setName(ev.target.value)} />
                        <input type="text" placeholder="Value" className="border-solid border-2 border-zinc-300 px-2 py-2" onChange={(ev) => setValue(ev.target.value)} />
                        {values.map((item, idx) => (
                            <div key={idx}>
                                <span>{item}</span>
                            </div>
                        ))}
                        <button onClick={() => onAddValues(value)} className="bg-blue-400 text-white px-2 py-2 hover:bg-blue-500">Add value to collection</button>
                        <button onClick={() => onMintCollection(name, values)} className="bg-blue-400 text-white px-2 py-2 hover:bg-blue-500">Mint collection</button>
                        <button onClick={() => setCloseModal(false)} className="bg-red-400 text-white px-2 py-2 hover:bg-red-500">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MintCollectionModal;
