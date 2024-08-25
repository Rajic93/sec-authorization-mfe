import axios from 'axios';
import { Resource } from "../dto/Resource.ts";
import { ResourceActions } from "../templates/ResourceForm/components/ResourceActions.tsx";

export type ScopeMapping = {
    name: string;
    propertyPath?: string;
};

export interface ResourceService {
    baseUrl?: string;
    createResourcePath?: string;
    loadResourcesPath?: string;
    loadResourceByIdPath?: string;
    deleteResourceByIdPath?: string;
    bulkDeleteResourcesPath?: string;
    updateResourceActionsByIdPath?: string;
    updateResourceActionScopesByIdAndActionIdPath?: string;
}

export default ({
    baseUrl,
    loadResourcesPath,
    loadResourceByIdPath,
    createResourcePath,
    deleteResourceByIdPath,
    bulkDeleteResourcesPath,
    updateResourceActionsByIdPath,
    updateResourceActionScopesByIdAndActionIdPath,
}: ResourceService | undefined = {}) =>  {
    const instance = axios.create({ baseURL: baseUrl || 'http://localhost:3000/'});

    const loadResources = async (pageSize: number, page: number): Promise<Resource[]> => instance
        .get(loadResourcesPath || '/resources', { params: { pageSize, page } })
        .then((res) => res.data);

    const loadResourceById = async (id: string): Promise<Resource> => instance
        .get(loadResourceByIdPath || `/resources/${id}`)
        .then((res) => res.data);

    const createResource = async (body: Partial<Resource>) => instance
        .post(createResourcePath || '/resources', body)
        .then((res) => res.data);

    const deleteResourceById = async (id: string) => instance
        .delete(deleteResourceByIdPath || `/resources/${id}`)
        .then((res) => res.data);

    const bulkDeleteResources = async (ids: string) => instance
        .delete(bulkDeleteResourcesPath || `/resources/`, { data: { ids } })
        .then((res) => res.data);

    const updateResourceActions = async (id: string, body: Partial<ResourceActions>) => instance
        .patch(
            updateResourceActionsByIdPath
                ? updateResourceActionsByIdPath
                    .replace(':id', id)
                : `/resources/${id}/actions`,
            body,
        )
        .then((res) => res.data);

    const updateResourceActionScopes = async (id: string, actionId: string, body: Partial<ScopeMapping>[]) => instance
        .patch(
            updateResourceActionScopesByIdAndActionIdPath
                ? updateResourceActionScopesByIdAndActionIdPath
                    .replace(':id', id)
                    .replace('/:actionId', actionId)
                : `/resources/${id}/actions/${actionId}/scopes`,
            body,
        )
        .then((res) => res.data);

    return {
        loadResources,
        loadResourceById,
        createResource,
        deleteResourceById,
        bulkDeleteResources,
        updateResourceActions,
        updateResourceActionScopes,
    };
}
