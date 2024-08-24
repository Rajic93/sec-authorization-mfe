import {Col, Row, Typography, Checkbox as ACheckbox} from "antd";
import {CheckboxChangeEvent} from "antd/es/checkbox";

interface CheckboxProps {
    name: string;
    label?: string;
    placeholder?: string;
    error?: string | null;
    value?: boolean;
    onInputChange: (key: string, value: string | number | boolean) => void;
    type?: string;
    preventSpaceInput?: boolean;
    spaceReplacementChar?: string;
}

const Checkbox  = ({
    name,
    label = '',
    error = null,
    value = false,
    onInputChange,
}: CheckboxProps) => {
    const handleCheckedChange = (event: CheckboxChangeEvent) => onInputChange(name, event.target.checked);

    return (
        <Row style={{ marginBottom: 10 }}>
            {label ? (
                <Col md={10} xs={24}>
                    <Typography.Text style={{ marginBottom: 8, display: 'inline-block' }}>{label}</Typography.Text>
                </Col>
            ) : null}
            <Col md={label ? 14 : 24} xs={24} style={{ width: '100%' }}>
                <>
                    <ACheckbox
                        checked={value}
                        onChange={handleCheckedChange}
                    />
                    {error ? (
                        <Typography.Text style={{ color: 'red' }}>{error}</Typography.Text>
                    ) : null}
                </>
            </Col>
        </Row>
    )
}

export default Checkbox;
