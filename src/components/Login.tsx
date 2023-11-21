import Web3Utils from "../lib/Web3Utils";

const Login = () => {
    const onLogin = async () => {
        const web3 = new Web3Utils();

        await web3.connectToMetaMask();
    }
    return (
        <div className="flex justify-center">
            <button className="px-4 py-4 rounded-md mt-12 text-white bg-amber-500 hover:bg-amber-600" onClick={onLogin}>Login with metamask</button>
        </div>
    )
};

export default Login;
