import {Button, Col, Form, Input, Row, Typography} from "antd";
import {MinusCircleOutlined, PlusOutlined, SubnodeOutlined} from "@ant-design/icons";
import debounce from "lodash/debounce";
import FormItem from "../../../atoms/FormItem";
import {split} from "lodash";

const Scopes = ({ onScopesChange, scopes = [] }) => {
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
        scope.mapping.path = split(value, ' ').join('.');
        onSetScopes([...scopes]);
    }

    return (
        <>
            <Row>
                <Col span={24}>
                    <Button
                        type="dashed"
                        onClick={onScopeAdd}
                        style={{ width: '100%', marginBottom: 10 }}
                        icon={<PlusOutlined />}
                    >
                        Add Scope
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    {scopes.map((scope, index) => (
                        <Row justify="space-between" style={{ marginTop: 15 }}>
                            <Col span={22}>
                                <FormItem placeholder="Scope name" value={scope.name} onInputChange={(_, value) => onScopeNameChange(scope.key, value)} onKeyDown={(e) => {
                                    if (e.which === 32) {
                                        e.preventDefault();
                                        e.target.value = e.target.value + '-';
                                    }
                                }}/>
                            </Col>
                            <Col span={2}>
                                <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => onScopeRemove(scope.key)}
                                    style={{ display: 'inline-block', marginLeft: 24, marginTop: 8 }}
                                />
                            </Col>
                            <Col span={24}>
                                {scope.mapping
                                    ? (
                                        <Row justify='start'>
                                            <Col span={22}>
                                                <FormItem
                                                    placeholder="Path mapping within the resource"
                                                    value={scope[index]?.mapping?.path}
                                                    onInputChange={(_, value) => onMappingChange(index, value)}
                                                    onKeyDown={(e) => {
                                                        if (e.which === 32) {
                                                            e.preventDefault();
                                                            e.target.value = e.target.value + '.';
                                                        }
                                                    }}
                                                />
                                            </Col>
                                            <Col span={2}>
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => onMappingRemove(index)}
                                                    style={{ display: 'inline-block', marginLeft: 24, marginTop: 8 }}
                                                />
                                            </Col>
                                        </Row>
                                    )
                                    : (
                                        <Button
                                            type="dashed"
                                            icon={<SubnodeOutlined />}
                                            style={{ width: '100%' }}
                                            onClick={() => onMappingAdd(index)}
                                        >
                                            Add scope maping
                                        </Button>
                                    )
                                }
                            </Col>
                        </Row>
                    ))}
                </Col>
            </Row>
        </>
    )
}

export default Scopes;
