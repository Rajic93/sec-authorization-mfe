import React, { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import ResourceFormTemplate from '../templates/ResourceForm';
import ResourcesList from "../molecules/ResourcesList/index.tsx";
import { Resource } from "../dto/Resource.ts";
import serviceFactory, {ResourceService} from "../services/resource.ts";
import Stats from "../templates/Stats";
import {ResourceFormTemplateModes} from "../templates/ResourceForm/types.ts";

const Context = React.createContext({ name: 'Default' });

type NotificationPlacement = NotificationArgsProps['placement'];

export interface ResourcesRoutesConfig {
    home: string;
    list: string;
    create: string;
    edit: string;
}

export interface ResourcesEvents {
    onCreateEvent?: (record: Partial<Resource>) => Promise<void>;
    onEditEvent?: (id: string, record: Partial<Resource>) => Promise<void>;
    onDeleteEvent?: (ids: string[]) =>Promise <void>;
}

export interface ResourceFormConfig {
    navigateBackOnCreate?: boolean;
    navigateBackOnEdit?: boolean;
    navigateOnCreateTo?: string;
    navigateOnEditTo?: string;
}

export interface ResourceNotificationsConfig {
    placement?: NotificationPlacement;
    editSuccessMessage?: string;
    createSuccessMessage?: string;
    deleteSuccessMessage?: string;
}

export interface ResourcesProps {
    routePaths?: ResourcesRoutesConfig;
    events?: ResourcesEvents;
    serviceConfig?: ResourceService;
    formConfig?: ResourceFormConfig;
    notificationsConfig?: ResourceNotificationsConfig;
}

export const Resources = ({ routePaths, events, serviceConfig, formConfig, notificationsConfig }: ResourcesProps) => {
    const service = serviceFactory(serviceConfig);
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message: string, type: string = 'success') => {
        if (type === 'success') {
            api.success({ message, placement: notificationsConfig?.placement || 'topRight' });
            return;
        }
        if (type === 'error') {
            api.error({ message, placement: notificationsConfig?.placement || 'topRight' });
            return;
        }
        api.info({ message, placement: notificationsConfig?.placement || 'topRight' });
    };

    const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

    return (
        <>
            <Context.Provider value={contextValue}>
                {contextHolder}
                <Routes>
                    <Route path={routePaths?.create || "/resources/create"} element={(
                        <ResourceFormTemplate
                            onSubmit={(record) => typeof events?.onCreateEvent === 'function'
                                ? events?.onCreateEvent(record)
                                    .then(() => openNotification(notificationsConfig?.createSuccessMessage || 'Resource successfully created.'))
                                    .catch((error) => openNotification(error.toString(), 'error'))
                                : openNotification(notificationsConfig?.createSuccessMessage || 'Resource successfully created.')}
                            resourceCreate={service.createResource}
                            resourceActionsPatch={service.updateResourceActions}
                            navigateBackOnSubmit={formConfig?.navigateBackOnCreate}
                            navigateOnSubmitTo={formConfig?.navigateOnCreateTo}
                        />
                    )}/>
                    <Route path={routePaths?.edit || "/resources/:id"} element={(
                        <ResourceFormTemplate
                            onSubmit={(record, id) => typeof events?.onEditEvent === 'function' ?
                                events?.onEditEvent(id as string, record)
                                    .then(() => {
                                        console.log("asdasdda")
                                        openNotification(notificationsConfig?.editSuccessMessage || 'Resource successfully updated.')
                                    })
                                    .catch((error) => openNotification(error.toString(), 'error'))
                                : openNotification(notificationsConfig?.editSuccessMessage || 'Resource successfully updated.')}
                            mode={ResourceFormTemplateModes.EDIT}
                            resourceActionsPatch={service.updateResourceActions}
                            resourceActionScopesPatch={service.updateResourceActionScopes}
                            resourceLoad={service.loadResourceById}
                            navigateBackOnSubmit={formConfig?.navigateBackOnEdit}
                            navigateOnSubmitTo={formConfig?.navigateOnEditTo}
                        />
                    )}/>
                    <Route path={routePaths?.list || "/resources"} element={(
                        <ResourcesList
                            onDelete={(ids) => typeof events?.onDeleteEvent === 'function'
                                ? events?.onDeleteEvent(ids)
                                    .then(() => openNotification(notificationsConfig?.deleteSuccessMessage || `Resource${ids?.length ? 's' : ''} successfully deleted.`))
                                    .catch((error) => openNotification(error.toString(), 'error'))
                                : openNotification(notificationsConfig?.deleteSuccessMessage || 'Resource successfully deleted.')}
                            resourcesLoad={service.loadResources}
                            resourceDelete={service.deleteResourceById}
                        />
                    )}/>
                    <Route path={routePaths?.home || "/"} element={(
                        <Stats definitions={[
                            { title: 'No. Resources' },
                            { title: 'No. Read actions allowed' },
                            { title: 'No. Create actions allowed' },
                            { title: 'No. Update actions allowed' },
                            { title: 'No. Patch actions allowed' },
                            { title: 'No. Delete actions allowed' },
                        ]}/>
                    )}/>
                </Routes>
            </Context.Provider>
        </>
    );
}

export default Resources;

