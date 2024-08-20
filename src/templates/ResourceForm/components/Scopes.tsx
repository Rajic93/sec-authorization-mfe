import { Button, Col, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import split from "lodash/split";
import Scope, { ScopeModel } from "./Scope";

interface ScopesProps {
    onScopesChange: (scopes: ScopeModel[]) => void;
    scopes: ScopeModel[];
}

const Scopes = ({ onScopesChange, scopes = [] }: ScopesProps) => {
    const onSetScopes = (newScopes: ScopeModel[]) => {
        onScopesChange(newScopes)
    }
    const onScopeAdd = () => onSetScopes([...scopes, { name: '', key: scopes.length.toString() }]);
    const onScopeRemove = (key: string) => onSetScopes(scopes.filter((_, index) => index !== Number.parseInt(key)));
    const onScopeNameChange = (key: string, value: string | number | boolean) => {
        const scope: ScopeModel = scopes[Number.parseInt(key)];
        scope.name = value.toString();
        onSetScopes([...scopes]);
    }
    const onMappingAdd = (key: string) => {
        const scope: ScopeModel | undefined = scopes.find((_, index) => index === Number.parseInt(key));
        console.log({ key, scope })
        if (!scope) {
            return;
        }
        scope.mapping = { path: '' };
        onSetScopes([...scopes]);
    }
    const onMappingRemove = (key: string) => {
        const scope: ScopeModel = scopes[Number.parseInt(key)];
        scope.mapping = undefined;
        onSetScopes([...scopes]);
    }
    const onMappingChange = (key: string, value: string | number | boolean) => {
        const scope: ScopeModel = scopes[Number.parseInt(key)];
        if (scope.mapping) {
            scope.mapping.path = split(value.toString(), ' ').join('.');
        }
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
                        <Scope
                            scope={{ ...scope, key: index.toString() }}
                            key={index.toString()}
                            onNameChange={onScopeNameChange}
                            onScopeRemove={onScopeRemove}
                            onMappingChange={onMappingChange}
                            onMappingRemove={onMappingRemove}
                            onMappingAdd={onMappingAdd}
                        />
                    ))}
                </Col>
            </Row>
        </>
    )
}

export default Scopes;
