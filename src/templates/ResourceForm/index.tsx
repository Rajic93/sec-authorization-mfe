import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pick from "lodash/pick";
import omit from "lodash/omit";
import map from "lodash/map";
import replace from "lodash/replace";
import { Button, Card, Col, Form, Row, Spin, Typography } from "antd";
import Scopes from "../../templates/ResourceForm/components/Scopes.tsx";
import ResourceInfo, {
    NameAndDescription,
    ResourceInfoErrors
} from "../../templates/ResourceForm/components/ResourceInfo.tsx";
import ResourceActions, { ResourceActions as ResourceActionsType } from "../../templates/ResourceForm/components/ResourceActions.tsx";
import { ScopeModel } from "./components/Scope.tsx";
import { Resource } from "../../dto/Resource.ts";
import {
    createResource,
    loadResourceById,
    updateResourceActions,
    updateResourceActionScopes
} from "../../services/resource.ts";

export enum ResourceFormTemplateModes {
    EDIT,
    CREATE,
}

interface ResourceFormTemplateProps {
    onSubmit?: (record: Partial<Resource>) => Partial<Resource>;
    mode?: ResourceFormTemplateModes;
}

const ResourceFormTemplate = ({ onSubmit = (nextResourceVersion: Partial<Resource>) => nextResourceVersion, mode = ResourceFormTemplateModes.CREATE }: ResourceFormTemplateProps) => {
    const [form, setForm] = useState<ResourceActionsType & NameAndDescription>({});
    const [isLoading, setIsLoading] = useState(false);
    const [scopes, setScopes] = useState<ScopeModel[]>([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();


    const onLoadHandler = () => {
        if (mode === ResourceFormTemplateModes.CREATE) {
            return;
        }

        setIsLoading(true);
        if (id) {
            loadResourceById(id).then((data) => {
                setForm({
                    ...omit(data, ['actions']),
                    actionId: data.actions[0]?.id,
                    ...pick(data.actions[0], ['readEnabled', 'createEnabled', 'updateEnabled', 'patchEnabled', 'deleteEnabled'])
                });
                setScopes(map(data.actions[0]?.subResources, (scope, index) => ({
                    name: scope.name,
                    key: index.toString(),
                    mapping: scope.propertyPath ? { path: replace(scope.propertyPath, '$.', '') } : undefined,
                })));
                setIsLoading(false);
            });
        }
    }
    useEffect(onLoadHandler, []);


    const onInputChange = (key: string, value: (string | number | boolean)) => form && setForm({ ...form, [key]: value });

    const onSubmitHandler = () => {
        const resource: Partial<Resource> = {
            name: form.name,
            description: form.description,
            readEnabled: form.readEnabled,
            updateEnabled: form.updateEnabled,
            patchEnabled: form.patchEnabled,
            deleteEnabled: form.deleteEnabled,
            createEnabled: form.createEnabled,
            // subResources: form.subResources,
        };
        const nextErrors: NameAndDescription = { ...errors };
        console.log({ resource })
        nextErrors.name = !resource.name ? 'Name is required' : undefined;
        nextErrors.description = !resource.description ? 'Description is required' : undefined ;
        console.log({ nextErrors })
        setErrors(nextErrors);
        // if (Object.keys(nextErrors).length) {
        //     return;
        // }
        if (mode === ResourceFormTemplateModes.CREATE) {
            createResource(resource)
                .then((created) => updateResourceActions(created.id, resource))
                .then((updated) => {
                    onSubmit(updated)
                    navigate(-1)
                });
        }
        if (!id) {
            return;
        }

        Promise.all([
            updateResourceActions(id, {
                readEnabled: !!form.readEnabled,
                updateEnabled: !!form.updateEnabled,
                patchEnabled: !!form.patchEnabled,
                deleteEnabled: !!form.deleteEnabled,
                createEnabled: !!form.createEnabled,
            }),
            updateResourceActionScopes(
                id,
                form.actionId as string,
                scopes.map((scope) => ({
                    name: scope.name,
                    propertyPath: scope.mapping ? `$.${scope.mapping?.path}` : undefined,
                })),
            ),
        ]).then(() => {
            onSubmit(resource);
            navigate(-1);
        })
    }
    return (
        <Card style={{ textAlign: 'start', borderRadius: 5 }}>
            <Typography.Title
                level={3}
                style={{ marginLeft: 0, marginTop: 10, marginBottom: 0 }}
            >
                {mode === ResourceFormTemplateModes.EDIT ? 'Edit' :'Create'} Resource
            </Typography.Title>
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
                                <ResourceInfo
                                    values={pick(form, ['name', 'description']) as NameAndDescription}
                                    errors={pick(errors, ['name', 'description']) as ResourceInfoErrors}
                                    onInputChange={onInputChange}
                                    enabled={mode === ResourceFormTemplateModes.CREATE}
                                />
                                <ResourceActions
                                    onInputChange={onInputChange}
                                    readEnabled={form.readEnabled}
                                    createEnabled={form.createEnabled}
                                    updateEnabled={form.updateEnabled}
                                    patchEnabled={form.patchEnabled}
                                    deleteEnabled={form.deleteEnabled}
                                />
                            </Col>
                            <Col xs={24} md={12}>
                                <Scopes onScopesChange={setScopes} scopes={scopes} />
                            </Col>
                        </Row>
                        <Row justify="end" style={{ borderTop: '1px solid rgba(5, 5, 5, 0.06)', paddingTop: 24, maxWidth: 1440 }}>
                            <Col span={2}>
                                <Button onClick={onSubmitHandler}>
                                    {mode === ResourceFormTemplateModes.EDIT ? 'Edit' : 'Create'}
                                </Button>
                            </Col>
                        </Row>
                    </>
                )}
            </Form>
        </Card>
    );
}

export default ResourceFormTemplate;
