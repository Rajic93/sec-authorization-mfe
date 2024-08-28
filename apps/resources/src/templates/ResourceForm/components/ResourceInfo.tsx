import TextInput from "../../../atoms/Input";
import { Typography, Row, Col } from 'antd';
import CopyValue from "../../../../../../packages/common/src/molecules/CopyValue";

export type OnInputChange = (key: string, value: string | number | boolean) => void
export type ResourceInfoErrors = { name?: string | undefined | null; description?: string | undefined | null }
export type NameAndDescription = { name?: string; description?: string; };

interface ResourceInfoProps {
    onInputChange: OnInputChange;
    errors?: ResourceInfoErrors;
    values: { name?: string; description?: string; id?: string; createdAt?: string; updatedAt?: string; };
    preventSpaceInName?: boolean;
    spaceInNameReplacementChar?: string;
}

const ResourceInfo = ({
    onInputChange,
    errors,
    values,
    preventSpaceInName = true,
}: ResourceInfoProps) => {
    const formatDate = (date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    return (
        <>
            <Row style={{ marginBottom: 10 }}>
                {values.id ? (
                    <>
                        <Col md={10} xs={24}>
                            <Typography.Text style={{ marginBottom: 8, display: 'inline-block' }}>ID:</Typography.Text>
                        </Col>
                        <Col md={values.id ? 14 : 24} xs={24} style={{ width: '100%' }}><CopyValue value={values.id}/></Col>
                    </>
                ) : null}
            </Row>
            <TextInput
                label="Name"
                name="name"
                onInputChange={onInputChange}
                error={errors?.name}
                value={values.name}
                preventSpaceInput={preventSpaceInName}
                spaceReplacementChar="-"
            />
            <TextInput
                label="Description"
                name="description"
                type="textarea" //
                onInputChange={onInputChange}
                value={values.description}
                error={errors?.description}
            />
            {values.createdAt ? (
                <Row style={{ paddingTop: 10 }}>
                    <Col md={10} xs={24}>
                        <Typography.Text style={{ marginBottom: 8, display: 'inline-block' }}>Created At:</Typography.Text>
                    </Col>
                    <Col md={values.createdAt ? 14 : 24} xs={24} style={{ width: '100%' }}>{formatDate(new Date(values.createdAt))}</Col>
                </Row>
            ) : null}
            {values.updatedAt ? (
                <Row style={{ paddingBottom: 15 }}>
                    <Col md={10} xs={24}>
                        <Typography.Text style={{ marginBottom: 8, display: 'inline-block' }}>Last Update:</Typography.Text>
                    </Col>
                    <Col md={values.updatedAt ? 14 : 24} xs={24} style={{ width: '100%' }}>{formatDate(new Date(values.updatedAt))}</Col>
                </Row>
            ) : null}
        </>
    );
}

export default ResourceInfo;
