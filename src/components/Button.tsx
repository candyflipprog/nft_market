interface IButton {
    name: string;
    onClick?: () => void;
}

const Button: React.FC<IButton> = ({ name, onClick }) => {
    return (
        <button className="bg-slate-400 text-white px-2 py-2 rounded-md hover:bg-slate-500" onClick={onClick}>{name}</button>
    )
};

export default Button;
