import {Button, Checkbox, Row, Table, TableProps, Tooltip} from "antd";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {loadResources, updateResourceActions} from "../../services/resource.ts";
import {CheckOutlined, CloseOutlined, EditOutlined, MoreOutlined} from "@ant-design/icons";
import {pick} from "lodash";

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
    key: React.Key;
    name: string;
    description: string;
    readEnabled: boolean;
    createEnabled: boolean;
    updateEnabled: boolean;
    patchEnabled: boolean;
    deleteEnabled: boolean;
}

const ResourcesList = () => {
    const [editedResource, setEditedResource] = useState<DataType>({});
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [rows, setRows] = useState([]);

    const onLoadHandler = () => {
        loadResources().then((data) => setRows(data));
    }

    useEffect(onLoadHandler, []);

    const onSelectChange = (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        setSelectedRowKeys(selectedRows.map(({key}: DataType) => key));
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const onEditClose = (record) => setEditedResource({
        ...editedResource,
        [record.id]: undefined,
    })

    const onEditOpen = (record) => setEditedResource({
        ...editedResource,
        [record.id]: { ...pick(record, ['readEnabled', 'updateEnabled', 'patchEnabled', 'deleteEnabled', 'createEnabled']) },
    })

    const onUpdateActionsComplete = (record) => {
        updateResourceActions(record.id, editedResource[record.id]).then(onLoadHandler);
        setEditedResource({
            ...editedResource,
            [record.id]: undefined,
        })
    }

    const onUpdateAction = (id, name, value) => {
        setEditedResource({
            ...editedResource,
            [id]: {
                ...editedResource[id],
                [name]: value,
            },
        })
    }

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
            render: (_, record) => <Checkbox disabled={!editedResource[record.id]} checked={(editedResource[record.id] || record).readEnabled} onChange={({ target: { checked: value } }) => onUpdateAction(record.id, 'readEnabled', value)}/>
        },
        {
            title: 'Create Enabled',
            dataIndex: 'createEnabled',
            key: 'createEnabled',
            render: (_, record) => <Checkbox disabled={!editedResource[record.id]} checked={(editedResource[record.id] || record).createEnabled} onChange={({ target: { checked: value } }) => onUpdateAction(record.id, 'createEnabled', value)}/>
        },
        {
            title: 'Patch Enabled',
            dataIndex: 'patchEnabled',
            key: 'patchEnabled',
            render: (_, record) => <Checkbox disabled={!editedResource[record.id]} checked={(editedResource[record.id] || record).patchEnabled} onChange={({ target: { checked: value } }) => onUpdateAction(record.id, 'patchEnabled', value)}/>
        },
        {
            title: 'Update Enabled',
            dataIndex: 'updateEnabled',
            key: 'updateEnabled',
            render: (_, record) => <Checkbox disabled={!editedResource[record.id]} checked={(editedResource[record.id] || record).updateEnabled} onChange={({ target: { checked: value } }) => onUpdateAction(record.id, 'updateEnabled', value)}/>
        },
        {
            title: 'Delete Enabled',
            dataIndex: 'deleteEnabled',
            key: 'deleteEnabled',
            render: (_, record) => <Checkbox disabled={!editedResource[record.id]} checked={(editedResource[record.id] || record).deleteEnabled} onChange={({ target: { checked: value } }) => onUpdateAction(record.id, 'deleteEnabled', value)}/>
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => editedResource[record.id]
                ? (
                    <Row>
                        <CheckOutlined style={{ marginRight: 10 }} onClick={() => onUpdateActionsComplete(record)} />
                        <CloseOutlined onClick={() => onEditClose(record)}/>
                    </Row>
                )
                : (
                    <Row>
                        <Tooltip title="Edit resource actions">
                            <EditOutlined
                                style={{ marginRight: 10 }}
                                onClick={() => onEditOpen(record)}
                            />
                        </Tooltip>
                        <Tooltip title="Resource details">
                            <Link to={`/resources/${record.id}`}>
                                <MoreOutlined />
                            </Link>
                        </Tooltip>
                    </Row>
                ),
        }
    ];

    return (
        <>
            <h1>Resources</h1>
            <Table
                columns={columns}
                dataSource={rows}
                rowSelection={rowSelection}
                title={() => (
                    <Link to="/resources/create" className="list">
                        <Button>
                            Create
                        </Button>
                    </Link>
                )}
            />
        </>
    )
}

export default ResourcesList;