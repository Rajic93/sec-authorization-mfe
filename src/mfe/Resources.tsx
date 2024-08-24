import { Route, Routes } from "react-router-dom";
import ResourceFormTemplate from '../templates/ResourceForm';
import ResourcesList from "../molecules/ResourcesList/index.tsx";
import { Resource } from "../dto/Resource.ts";
import serviceFactory, {ResourceService} from "../services/resource.ts";
import Stats from "../templates/Stats";
import {ResourceFormTemplateModes} from "../templates/ResourceForm/types.ts";

interface ResourcesRoutesConfig {
    home: string;
    list: string;
    create: string;
    edit: string;
}

interface ResourcesEvents {
    onCreateEvent?: (record: Partial<Resource>) => void;
    onEditEvent?: (id: string, record: Partial<Resource>) => void;
    onDeleteEvent?: (ids: string[]) => void;
}

interface ResourcesProps {
    routePaths?: ResourcesRoutesConfig;
    events?: ResourcesEvents;
    serviceConfig?: ResourceService;
}

export const Resources = ({ routePaths, events, serviceConfig }: ResourcesProps) => {
    const service = serviceFactory(serviceConfig);

    return (
        <>
            <Routes>
                <Route path={routePaths?.create || "/resources/create"} element={(
                    <ResourceFormTemplate
                        onSubmit={(record) =>
                            typeof events?.onCreateEvent === 'function' &&
                            events?.onCreateEvent(record)}
                        resourceCreate={service.createResource}
                        resourceActionsPatch={service.updateResourceActions}
                    />
                )}/>
                <Route path={routePaths?.edit || "/resources/:id"} element={(
                    <ResourceFormTemplate
                        onSubmit={(record, id) =>
                            typeof events?.onEditEvent === 'function' &&
                            events?.onEditEvent(id as string, record)}
                        mode={ResourceFormTemplateModes.EDIT}
                        resourceActionsPatch={service.updateResourceActions}
                        resourceActionScopesPatch={service.updateResourceActionScopes}
                        resourceLoad={service.loadResourceById}
                    />
                )}/>
                <Route path={routePaths?.list || "/resources"} element={(
                    <ResourcesList
                        onDelete={(ids) => typeof events?.onDeleteEvent === 'function' &&
                            events?.onDeleteEvent(ids)}
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

        </>
    );
}

export default Resources;

