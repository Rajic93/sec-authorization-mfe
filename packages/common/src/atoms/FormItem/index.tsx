import {Checkbox, Col, Input, InputProps, Row, Typography} from "antd";
import {SyntheticEvent} from "react";
import {TextAreaProps} from "antd/es/input";


export interface onKeyDownType {
    target: SyntheticEvent<HTMLInputElement> & { value: string };
    which: number;
}

interface FormItemProps {
    name: string;
    label?: string;
    placeholder?: string;
    error?: string | null;
    value?: string | number | bigint | readonly string[] | boolean | undefined;
    onInputChange: (key: string, value: string | number | boolean) => void;
    type?: string;
    preventSpaceInput?: boolean;
    spaceReplacementChar?: string;
}

const FormItem  = ({
   name,
   label = '',
   placeholder = '',
   error = null,
   value,
   onInputChange,
   type= "input",
   preventSpaceInput = false,
   spaceReplacementChar = ' ',
   ...props
}: FormItemProps & InputProps & TextAreaProps) => (
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
                     <Input
                         placeholder={placeholder}
                         value={value}
                         onChange={({ target: { value: nextValue } }) => onInputChange(name, nextValue)}
                         onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                             if (preventSpaceInput && e.which === 32) {
                                 e.preventDefault();
                                 const target = e.target as unknown as { value: string; };
                                 target.value = target.value + spaceReplacementChar;
                             }
                         }}
                        {...props}
                     />
                        {error ? (
                            <Typography.Text style={{ color: 'red' }}>{error}</Typography.Text>
                        ) : null}
                 </>
            ) : null}
            {type === 'textarea' ? (
                <>
                    <Input.TextArea
                        placeholder={placeholder}
                        value={value}
                        rows={4}
                        onChange={({ target: { value: nextValue } }) => onInputChange(name, nextValue)}
                        {...props}
                    />
                    {error ? (
                        <Typography.Text style={{ color: 'red' }}>{error}</Typography.Text>
                    ) : null}
                </>
            ) : null}
            {type === 'checkbox' ? (
                <Checkbox checked={value as boolean | undefined} onChange={({ target: { checked: nextValue } }) => onInputChange(name, nextValue)}/>
            ) : null}
        </Col>
    </Row>
)

export default FormItem;
