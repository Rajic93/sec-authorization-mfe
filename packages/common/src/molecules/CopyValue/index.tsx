import { useState } from "react";
import { Tooltip, Typography } from 'antd';
import { CopyOutlined } from '@ant-design/icons'

export interface CopyValueProps {
    value?: number | string | boolean;
    noLabel?: boolean;
}

const CopyValue = ({ value = '', noLabel = false }: CopyValueProps) => {
    const [idCopied, setCopied] = useState(false)

    return (
        <>
            {!noLabel ? (
                <Typography.Text
                    style={{ marginBottom: 8, display: 'inline-block', marginRight: 5 }}
                >
                    {value}
                </Typography.Text>
            ): null}
            <Tooltip
                title={`${idCopied ? 'Copied' : 'Copy'} to clipboard`}
            >
                <CopyOutlined
                    style={{ cursor: 'pointer', color: idCopied ? 'green' : undefined }}
                    onClick={() => window.navigator.clipboard.writeText(value ? value.toString() : '').then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 3000);
                    })}
                />
            </Tooltip>
        </>
    );
};

export default CopyValue;
