import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { Checkbox, Row, Table, TableProps, Tooltip, Typography } from "antd";
import {DeleteOutlined, MoreOutlined, PlusCircleOutlined} from "@ant-design/icons";
import { Resource } from "../../dto/Resource.ts";
import map from "lodash/map";

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
    key: React.Key;
}

const tableIconButtonStyle = {
    fontSize: 18,
    marginRight: 4,
};

interface ResourceListProps {
    resourcesLoad: () => Promise<Resource[]>;
    resourceDelete: (id: string) => Promise<Resource[]>;
    onDelete?: (ids: string[]) => void;
}

const ResourceList = ({ resourcesLoad, resourceDelete, onDelete = (deletedIds) => console.log({ deletedIds }) }: ResourceListProps) => {
    const [editedResource, setEditedResource] = useState<Record<string, Partial<Resource> | undefined>>({});
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [rows, setRows] = useState<Resource[]>([]);
    const navigate = useNavigate();

    const onLoadHandler = () => {
        resourcesLoad()
            .then((data) => setRows(
                map(data, (row) => ({
                    ...row,
                    key: row.id,
                }))
            ));
    }

    useEffect(onLoadHandler, []);

    const onSelectChange = (_: React.Key[], selectedRows: DataType[]) => {
        setSelectedRowKeys(selectedRows.map(({key}: DataType) => key));
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const onUpdateAction = (id: string, name: string, value: string | number | boolean) => {
        setEditedResource({
            ...editedResource,
            [id]: {
                ...editedResource[id],
                [name]: value,
            },
        })
    }

    const onBulkDelete = () => Promise.all(map(
        selectedRowKeys,
        async (id) => {
            await resourceDelete(id.toString());
            return id;
        },
    )).then((ids) => {
        setEditedResource({});
        setSelectedRowKeys([]);
        onLoadHandler()
        onDelete(ids as string[])
    });

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Read Enabled',
            dataIndex: 'readEnabled',
            key: 'readEnabled',
            render: (_: undefined, record: Resource) => <Checkbox disabled={!editedResource[record.id]} checked={(editedResource[record.id] || record).readEnabled} onChange={({ target: { checked: value } }) => onUpdateAction(record.id, 'readEnabled', value)}/>
        },
        {
            title: 'Create Enabled',
            dataIndex: 'createEnabled',
            key: 'createEnabled',
            render: (_: undefined, record: Resource) => <Checkbox disabled={!editedResource[record.id]} checked={(editedResource[record.id] || record).createEnabled} onChange={({ target: { checked: value } }) => onUpdateAction(record.id, 'createEnabled', value)}/>
        },
        {
            title: 'Patch Enabled',
            dataIndex: 'patchEnabled',
            key: 'patchEnabled',
            render: (_: undefined, record: Resource) => <Checkbox disabled={!editedResource[record.id]} checked={(editedResource[record.id] || record).patchEnabled} onChange={({ target: { checked: value } }) => onUpdateAction(record.id, 'patchEnabled', value)}/>
        },
        {
            title: 'Update Enabled',
            dataIndex: 'updateEnabled',
            key: 'updateEnabled',
            render: (_: undefined, record: Resource) => <Checkbox disabled={!editedResource[record.id]} checked={(editedResource[record.id] || record).updateEnabled} onChange={({ target: { checked: value } }) => onUpdateAction(record.id, 'updateEnabled', value)}/>
        },
        {
            title: 'Delete Enabled',
            dataIndex: 'deleteEnabled',
            key: 'deleteEnabled',
            render: (_: undefined, record: Resource) => <Checkbox disabled={!editedResource[record.id]} checked={(editedResource[record.id] || record).deleteEnabled} onChange={({ target: { checked: value } }) => onUpdateAction(record.id, 'deleteEnabled', value)}/>
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_: undefined, record: Resource) => (
                <Tooltip title="Resource details">
                    <Link to={`/resources/${record.id}`}>
                        <MoreOutlined />
                    </Link>
                </Tooltip>
            ),
        }
    ];

    return (
        <Table
            columns={columns}
            dataSource={rows}
            rowSelection={rowSelection as never} // todo: fix never cast
            title={() => (
                <Row>
                    <Typography.Text
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        onClick={() => navigate('/resources/create')}
                    >
                        <PlusCircleOutlined
                            style={tableIconButtonStyle}
                        />
                        Create Resource
                    </Typography.Text>
                    {selectedRowKeys.length ? (
                        <Typography.Text
                            style={{ cursor: 'pointer', marginLeft: 24, display: 'flex', alignItems: 'center' }}
                            onClick={onBulkDelete}
                        >
                            <DeleteOutlined
                                style={tableIconButtonStyle}
                            />
                            {' '}
                            Bulk Delete Resources
                        </Typography.Text>
                    ): null}
                </Row>
            )}
        />
    )
}

export default ResourceList;