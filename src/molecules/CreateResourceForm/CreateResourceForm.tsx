import {Button, Card, Checkbox, Col, Form, Input, Row, Typography} from "antd";
import TextArea from "antd/es/input/TextArea";
import Scopes from "../EditResourceForm/components/Scopes.tsx";
import {useState} from "react";

const CreateResourceForm = ({ onSubmit = (e: Record<string, string | boolean>) => e }) => {
    const [form, setForm] = useState({});
    const [scopes, setScopes] = useState<Record<string, any>[]>([]);
    const [errors, setErrors] = useState({});

    const onInputChange = (key, value) => form && setForm({ ...form, [key]: value });

    const onSubmitHandler = () => {
        const resource = {
            name: form.name,
            description: form.description,
            readEnabled: !!form.readEnabled,
            updateEnabled: !!form.updateEnabled,
            patchEnabled: !!form.patchEnabled,
            deleteEnabled: !!form.deleteEnabled,
            createEnabled: !!form.createEnabled,
            subResources: form.subResources,
            scopes: scopes.map((scope) => ({ name: scope.name, pathMapping: `$.${scope.mapping.path}` })),
        };
        const nextErrors = { ...errors };
        console.log({ resource })
        nextErrors.name = !resource.name ? 'Name is required' : undefined;
        nextErrors.description = !resource.description ? 'Description is required' : undefined ;
        console.log({ nextErrors })
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) {
            return;
        }
        onSubmit(resource);
    }
    return (
        <Card style={{ textAlign: 'start' }}>
            <Typography.Title level={3} style={{ marginLeft: 24 }}>Create Resource</Typography.Title>
            <Form
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{ borderTop: '1px solid rgba(5, 5, 5, 0.06)', paddingTop: 24 }}
            >
                <Row gutter={32} style={{ maxWidth: 1440 }}>
                    <Col xs={24} md={12}>
                        <Form.Item label="name" name="name">
                            <Input value={form.name} onChange={({ target: { value } }) => onInputChange('name', value)} />
                            {errors.name ? (
                                <Typography.Text style={{ color: 'red' }}>{errors.name}</Typography.Text>
                            ) : null}
                        </Form.Item>
                        <Form.Item label="description" name="description">
                            <TextArea value={form.description} rows={4} onChange={({ target: { value } }) => onInputChange('description', value)}/>
                            {errors.description ? (
                                <Typography.Text style={{ color: 'red' }}>{errors.description}</Typography.Text>
                            ) : null}
                        </Form.Item>
                        <Form.Item
                            label="Read Enabled"
                            name="readEnabled"
                            valuePropName="checked"
                            labelCol={{span: 8}}
                            wrapperCol={{span: 2}}
                        >
                            <Checkbox value={form.readEnabled} onChange={({ target: { value } }) => onInputChange('readEnabled', value)}/>
                        </Form.Item>
                        <Form.Item
                            label="Create Enabled"
                            name="createEnabled"
                            valuePropName="checked"
                            labelCol={{span: 8}}
                            wrapperCol={{span: 2}}
                        >
                            <Checkbox value={form.createEnabled} onChange={({ target: { value } }) => onInputChange('createEnabled', value)}/>
                        </Form.Item>
                        <Form.Item
                            label="Delete Enabled"
                            name="deleteEnabled"
                            valuePropName="checked"
                            labelCol={{span: 8}}
                            wrapperCol={{span: 2}}
                        >
                            <Checkbox value={form.readdeleteEnabledEnabled} onChange={({ target: { value } }) => onInputChange('deleteEnabled', value)}/>
                        </Form.Item>
                        <Form.Item
                            label="Update Enabled"
                            name="updateEnabled"
                            valuePropName="checked"
                            labelCol={{span: 8}}
                            wrapperCol={{span: 2}}
                        >
                            <Checkbox value={form.updateEnabled} onChange={({ target: { value } }) => onInputChange('updateEnabled', value)}/>
                        </Form.Item>
                        <Form.Item
                            label="Patch Enabled"
                            name="patchEnabled"
                            valuePropName="checked"
                            labelCol={{span: 8}}
                            wrapperCol={{span: 2}}
                        >
                            <Checkbox value={form.patchEnabled} onChange={({ target: { value } }) => onInputChange('patchEnabled', value)}/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Scopes onScopesChange={setScopes} scopes={scopes} />
                    </Col>
                </Row>
                <Row justify="end" style={{ borderTop: '1px solid rgba(5, 5, 5, 0.06)', paddingTop: 24, maxWidth: 1440 }}>
                    <Form.Item
                        wrapperCol={{span: 2}}
                    >
                        <Button onClick={onSubmitHandler}>Create</Button>
                    </Form.Item>
                </Row>
            </Form>
        </Card>
    );
}

export default CreateResourceForm;
