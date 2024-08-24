import {Col, Input, Row, Typography} from "antd";

interface TextInputProps {
    name: string;
    label?: string;
    placeholder?: string;
    error?: string | null;
    value?: string;
    onInputChange: (key: string, value: string | number | boolean) => void;
    type?: string;
    preventSpaceInput?: boolean;
    enabled?: boolean;
    spaceReplacementChar?: string;
}

const TextInput  = ({
    name,
    label = '',
    placeholder = '',
    error = null,
    value,
    onInputChange,
    preventSpaceInput = false,
    spaceReplacementChar = ' ',
    enabled = true,
    type,
   ...props
}: TextInputProps) => {
    const handleInputChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => onInputChange(name, event.target.value);
    const handleKeyDown: React.KeyboardEventHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const event = e as unknown as React.ChangeEvent<HTMLInputElement>;
        if (preventSpaceInput && e.which === 32) {
            event.preventDefault();
            event.target.value = event.target.value + spaceReplacementChar;
        }
    }
    return (
        <Row style={{ marginBottom: 10 }}>
            {label ? (
                <Col md={10} xs={24}>
                    <Typography.Text style={{ marginBottom: 8, display: 'inline-block' }}>{label}</Typography.Text>
                </Col>
            ) : null}
            <Col md={label ? 14 : 24} xs={24} style={{ width: '100%' }}>
                <>
                    {type === 'textarea' ? (
                        <Input.TextArea
                            placeholder={placeholder}
                            value={value}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            disabled={!enabled}
                            {...props}
                        />
                        ) : (
                        <Input
                            placeholder={placeholder}
                            value={value}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            disabled={!enabled}
                            {...props}
                        />
                    )}
                    {error ? (
                        <Typography.Text style={{ color: 'red' }}>{error}</Typography.Text>
                    ) : null}
                </>
            </Col>
        </Row>
    )
}

export default TextInput;
