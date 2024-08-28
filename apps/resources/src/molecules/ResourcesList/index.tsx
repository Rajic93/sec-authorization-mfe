import { useEffect, useState, Key } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Row, Table, TableProps, Tooltip, Typography } from "antd";
import { DeleteOutlined, MoreOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Resource } from "../../dto/Resource.ts";
import map from "lodash/map";
import slice from "lodash/slice";
import CopyValue from "../../../../../packages/common/src/molecules/CopyValue";

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
    key: Key;
}

const tableIconButtonStyle = {
    fontSize: 18,
    marginRight: 4,
};

interface ResourceListProps {
    resourcesLoad: (pageSize: number, pageNumber: number) => Promise<Resource[]>;
    resourceDelete?: (ids: string[]) => Promise<Resource[]>;
    resourcesBulkDelete?: (id: string[]) => Promise<Resource[]>;
    onDelete?: (ids: string[]) => void;
    defaultPageSize?: number;
}

const ResourceList = ({ defaultPageSize = 10, resourcesLoad, resourcesBulkDelete, onDelete = (deletedIds) => console.log({ deletedIds }) }: ResourceListProps) => {
    const [editedResource, setEditedResource] = useState<Record<string, Partial<Resource> | undefined>>({});
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const [rows, setRows] = useState<Resource[]>([]);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const onLoadHandler = (pSize: number = pageSize, pageNumber: number = 1) => {
        resourcesLoad(pSize, pageNumber)
            .then((data) => setRows(
                map(data, (row) => ({
                    ...row,
                    key: row.id,
                }))
            ));
    }

    useEffect(onLoadHandler, []);

    const onSelectChange = (_: React.Key[], selectedRows: DataType[]) => {
        setSelectedRowKeys(selectedRows.map(({key}: DataType) => key.toString()));
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

    const onBulkDelete = () => typeof resourcesBulkDelete === 'function' && resourcesBulkDelete(selectedRowKeys)
        .then((resources) => {
            setEditedResource({});
            setSelectedRowKeys([]);
            onLoadHandler()
            onDelete(map(resources, (resource: Resource) => resource.id))
        });

    const onPageChange = (nextPage: number, nextPageSize: number) => {
        console.log({ page, pageSize })
        if (pageSize !== nextPageSize) {
            setPageSize(nextPageSize);
        }
        const resolvedPageSize = pageSize !== nextPageSize ? nextPageSize: pageSize;
        const resolvedPage = pageSize !== nextPageSize ? 1: nextPage;
        setPage(resolvedPage);
        console.log({ resolvedPageSize, resolvedPage });
        onLoadHandler(resolvedPageSize, resolvedPage);
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (_: undefined, record: Resource) => (
                <Typography.Text>
                    <Tooltip
                        title={record.id}
                    >
                        <Typography.Text>
                            {slice(record.id, 0, 8)}...
                        </Typography.Text>
                        {" "}
                    </Tooltip>
                    <CopyValue value={record.id} noLabel/>
                </Typography.Text>
            ),
            responsive: ['lg'],
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
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
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_: undefined, record: Resource) => {
                const createdAt = new Date(record.createdAt);
                return `${createdAt.getFullYear()}-${createdAt.getMonth()}-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
            },
            responsive: ['lg'],
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            fixed: 'right',
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
        <>
            <Table
                columns={columns as any}
                dataSource={rows}
                rowSelection={rowSelection as never} // todo: fix never cast
                pagination={{ position: 'center', onChange: onPageChange, total: 500, pageSizeOptions: [2, 10, 50, 100], current: page, pageSize } as any}
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
        </>
    );
}

export default ResourceList;
