import { Button, Col, Row } from "antd";
import { MinusCircleOutlined, SubnodeOutlined } from "@ant-design/icons";
import TextInput from "../../../atoms/Input";

export interface ScopeModel {
    name: string;
    key: string;
    mapping?: { path?: string; };
    propertyPath?: string;
}

interface ScopeProps {
    scope: ScopeModel;
    disabled?: boolean;
    key: string,
    onNameChange: (scope: string, value: string | number | boolean) => void;
    onScopeRemove: (scope: string) => void;
    onMappingChange: (scope: string, value: string | number | boolean) => void;
    onMappingRemove: (scope: string) => void;
    onMappingAdd: (scope: string) => void;
}

const Scope = ({
    scope,
    onNameChange,
    onScopeRemove,
    onMappingChange,
    onMappingRemove,
    onMappingAdd,
    disabled,
}: ScopeProps) => {
    return (
        <Row justify="space-between" style={{ marginTop: 15 }}>
            <Col span={22}>
                <TextInput
                    placeholder="Scope name"
                    value={scope.name}
                    name="scope.name"
                    onInputChange={(_, value) => onNameChange(scope.key, value)}
                    enabled={!disabled}
                />
            </Col>
            <Col span={2}>
                <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => !disabled && onScopeRemove(scope.key)}
                    style={{ display: 'inline-block', marginLeft: 24, marginTop: 8, opacity: disabled ? 0.6 : 1 }}
                />
            </Col>
            <Col span={24}>
                {scope.mapping
                    ? (
                        <Row justify='start'>
                            <Col span={22}>
                                <TextInput
                                    placeholder="Path mapping within the resource"
                                    value={scope.mapping?.path}
                                    name="scope.mapping.path"
                                    onInputChange={(_, value) => onMappingChange(scope.key, value)}
                                    enabled={!disabled}
                                />
                            </Col>
                            <Col span={2}>
                                <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => !disabled && onMappingRemove(scope.key)}
                                    style={{ display: 'inline-block', marginLeft: 24, marginTop: 8, opacity: disabled ? 0.6 : 1 }}
                                />
                            </Col>
                        </Row>
                    )
                    : (
                        <Button
                            type="dashed"
                            icon={<SubnodeOutlined />}
                            style={{ width: '100%' }}
                            disabled={disabled}
                            onClick={() => onMappingAdd(scope.key)}
                        >
                            Add scope maping
                        </Button>
                    )
                }
            </Col>
        </Row>
    );
}

export default Scope;
