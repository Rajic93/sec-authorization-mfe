import {Button, Card, Col, Form, Row, Spin, Tooltip, Typography} from "antd";
import Scopes from "./components/Scopes.tsx";
import {useEffect, useState} from "react";
import {loadResourceById, updateResourceActions, updateResourceActionScopes} from "../../services/resource.ts";
import {useParams} from "react-router-dom";
import FormItem from "../../atoms/FormItem";
import {omit, pick} from "lodash";
import {CopyOutlined} from "@ant-design/icons";

const EditResourceForm = ({ onSubmit = (e: Record<string, string | boolean>) => e }) => {
    const [form, setForm] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [scopes, setScopes] = useState<Record<string, any>[]>([]);
    const [errors, setErrors] = useState({});
    const { id } = useParams();

    const onLoadHandler = () => {
        setIsLoading(true);
        loadResourceById(id).then((data) => {
            setForm({ ...omit(data, ['actions']), actionId: data.actions[0]?.id, ...pick(data.actions[0], ['readEnabled', 'createEnabled', 'updateEnabled', 'patchEnabled', 'deleteEnabled'])});
            setScopes(data.actions[0]?.subResources || []);
            setIsLoading(false);
        });
    }

    useEffect(onLoadHandler, []);

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
            // scopes: scopes.map((scope) => ({ name: scope.name, pathMapping: `$.${scope.mapping.path}` })),
        };
        const nextErrors = { ...errors };
        nextErrors.name = !resource.name ? 'Name is required' : undefined;
        nextErrors.description = !resource.description ? 'Description is required' : undefined ;
        setErrors(nextErrors);
        // if (Object.keys(nextErrors).length) {
        //     return;
        // }
        updateResourceActions(id, {
            readEnabled: !!form.readEnabled,
            updateEnabled: !!form.updateEnabled,
            patchEnabled: !!form.patchEnabled,
            deleteEnabled: !!form.deleteEnabled,
            createEnabled: !!form.createEnabled,
        })
        console.log({ scopes })
        updateResourceActionScopes(id, form.actionId, scopes.map((scope) => ({
            name: scope.name,
            propertyMapping: scope.mapping?.path,
        })))
        // onSubmit(resource);
    }
    return (
        <Card style={{ textAlign: 'start' }}>
            <Typography.Title level={3} style={{ marginLeft: 0, marginTop: 10, marginBottom: 0 }}>Edit Resource </Typography.Title>
            <Typography.Text style={{ display: 'inline-block', marginBottom: 20 }}>({id}) <Tooltip title="Copy to clipboard"><CopyOutlined onClick={() => navigator.clipboard.writeText(id)} /></Tooltip></Typography.Text>
            <Form
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{ borderTop: '1px solid rgba(5, 5, 5, 0.06)', paddingTop: 24 }}
            >
                {isLoading && <Spin />}
                {!isLoading && (
                    <>
                    <Row gutter={32} style={{ maxWidth: 1440 }}>
                        <Col xs={24} md={12}>
                            <FormItem label="Name" name="name" onInputChange={onInputChange} error={errors.name} value={form.name} onKeyDown={(e) => {
                                if (e.which === 32) {
                                    e.preventDefault();
                                    e.target.value = e.target.value + '-';
                                }
                            }} />
                            <FormItem label="Description" name="description" type="textarea" onInputChange={onInputChange} value={form.description} error={errors.description}/>
                            <FormItem label="Read Enabled" name="readEnabled" type="checkbox" onInputChange={onInputChange} value={form.readEnabled}/>
                            <FormItem label="Create Enabled" name="createEnabled" type="checkbox" onInputChange={onInputChange} value={form.createEnabled}/>
                            <FormItem label="Update Enabled" name="updateEnabled" type="checkbox" onInputChange={onInputChange} value={form.updateEnabled}/>
                            <FormItem label="Patch Enabled" name="patchEnabled" type="checkbox" onInputChange={onInputChange} value={form.patchEnabled}/>
                            <FormItem label="Delete Enabled" name="deleteEnabled" type="checkbox" onInputChange={onInputChange} value={form.deleteEnabled}/>
                        </Col>
                        <Col xs={24} md={12}>
                            <Scopes onScopesChange={setScopes} scopes={scopes} />
                        </Col>
                    </Row>
                    <Row justify="end" style={{ borderTop: '1px solid rgba(5, 5, 5, 0.06)', paddingTop: 24, maxWidth: 1440 }}>
                        <Form.Item
                            wrapperCol={{span: 2}}
                        >
                            <Button onClick={onSubmitHandler}>Update</Button>
                        </Form.Item>
                    </Row>
                </>
            )}
            </Form>
        </Card>
    );
}

export default EditResourceForm;
