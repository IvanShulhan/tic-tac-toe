import {FC, ReactNode} from "react";

type ButtonProps = {
    children: ReactNode;
    onClick: () => void;
}

export const Button: FC<ButtonProps> = ({ children, onClick }) => (
    <button onClick={onClick} className="button">
        {children}
    </button>
)