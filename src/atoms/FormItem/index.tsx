import {Checkbox, Col, Input, Row, Typography} from "antd";

const FormItem  = ({ name, label = '', placeholder = '', error = null, value, onInputChange, type= "input", ...props }) => (
    <Row style={{ marginBottom: 10 }}>
        {label ? (
            <Col md={10} xs={['checkbox'].includes(type) ? 21 : 24}>
                <Typography.Text style={{ marginBottom: 8, display: 'inline-block' }}>{label}</Typography.Text>
            </Col>
        ) : null}
        <Col md={label ? 14 : 24} xs={['checkbox'].includes(type) ? 1 : 24} style={{ width: '100%' }}>
            {type === 'input'
             ? (
                 <>
                     <Input placeholder={placeholder} value={value} onChange={({ target: { value: nextValue } }) => onInputChange(name, nextValue)} {...props} />
                        {error ? (
                            <Typography.Text style={{ color: 'red' }}>{error}</Typography.Text>
                        ) : null}
                 </>
            ) : null}
            {type === 'textarea' ? (
                <>
                    <Input.TextArea placeholder={placeholder} value={value} rows={4} onChange={({ target: { value: nextValue } }) => onInputChange(name, nextValue)} {...props} />
                    {error ? (
                        <Typography.Text style={{ color: 'red' }}>{error}</Typography.Text>
                    ) : null}
                </>
            ) : null}
            {type === 'checkbox' ? (
                <Checkbox checked={value} onChange={({ target: { checked: nextValue } }) => onInputChange(name, nextValue)}/>
            ) : null}
        </Col>
    </Row>
)

export default FormItem;
