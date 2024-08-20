import { useNavigate } from "react-router-dom";
import { Typography } from "antd";

interface LinkProps {
    children?: React.ReactNode,
    text?: string,
    to: string,
    style: Record<string, string | number>,
}

const Link = ({ text, to, children, ...props }: LinkProps) => {
    const navigate = useNavigate();

    return (
        <Typography.Text {...props} onClick={() => navigate(to)}>
            {children || text}
        </Typography.Text>
    )
}

export default Link;
