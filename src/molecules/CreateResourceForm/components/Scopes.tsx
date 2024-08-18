import {Button, Col, Form, Input, Row, Typography} from "antd";
import {MinusCircleOutlined, PlusOutlined, SubnodeOutlined} from "@ant-design/icons";
import debounce from "lodash/debounce";

const Scopes = ({ onScopesChange, scopes }) => {
    const onSetScopes = (newScopes) => {
        onScopesChange(newScopes)
    }
    const onScopeAdd = () => onSetScopes([...scopes, { name: '', key: scopes.length }]);
    const onScopeRemove = (key) => onSetScopes(scopes.filter((s) => s.key !== key));
    const onScopeNameChange = (key, value) => {
        const scope = scopes[key];
        scope.name = value;
        onSetScopes([...scopes]);
    }

    const onMappingAdd = (key) => {
        const scope = scopes[key];
        scope.mapping = { path: '' };
        onSetScopes([...scopes]);
    }
    const onMappingRemove = (key) => {
        const scope = scopes[key];
        scope.mapping = undefined;
        onSetScopes([...scopes]);
    }
    const onMappingChange = (key, value) => {
        const scope = scopes[key];
        scope.mapping.path = value;
        onSetScopes([...scopes]);
    }

    return (
        <>
            <Row>
                <Col span={24} style={{ alignItems: 'center' }}>
                    <Form.Item style={{ width: '100%' }}>
                        <Button
                            type="dashed"
                            onClick={onScopeAdd}
                            style={{ width: '65%', minWidth: 200 }}
                            icon={<PlusOutlined />}
                        >
                            Add Sub-Resource
                        </Button>
                        {/*<Form.ErrorList errors={errors} />*/}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {scopes.map((scope) => (
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                labelCol={{
                                    xs: {span: 24},
                                    sm: {span: 4},
                                }}
                                wrapperCol={{
                                    xs: { span: 24 },
                                    sm: { span: 20 },
                                }}
                                required={false}
                                key={scope.key}
                            >
                                <Form.Item
                                    noStyle
                                >
                                    <Input placeholder="scope name" style={{ width: '60%' }} onChange={debounce(({ target: {value} }) => onScopeNameChange(scope.key, value), 300)}/>
                                </Form.Item>
                                <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => onScopeRemove(scope.key)}
                                    style={{ display: 'inline-block', marginLeft: 24 }}
                                />
                                {scope.mapping
                                    ? (
                                        <Row style={{ marginTop: 10 }} justify='start'>
                                            <Typography.Text style={{ width: 80, display: 'flex', alignItems: 'center' }}>Mapping: $.</Typography.Text>
                                            <Input
                                                placeholder={"Scope path"}
                                                name={[scope.key, 'scope']}
                                                style={{ display: 'inline-block', width: 'calc(100% - 110px)' }}
                                                onChange={debounce(({ target: { value }}) => onMappingChange(scope.key, value), 300)}
                                            />
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => onMappingRemove(scope.key)}
                                                style={{ width: 20, marginLeft: 10, display: 'flex', alignItems: 'center' }}
                                            />
                                        </Row>
                                    )
                                    : (
                                        <Button
                                            type="dashed"
                                            icon={<SubnodeOutlined />}
                                            style={{ marginTop: 10 }}
                                            onClick={() => onMappingAdd(scope.key)}
                                        >
                                            Add scope maping
                                        </Button>
                                    )
                                }
                                <Form.ErrorList errors={[]} />
                            </Form.Item>
                        </Col>
                    </Row>
                ))}
            </Row>
        </>
    )
}

export default Scopes;
