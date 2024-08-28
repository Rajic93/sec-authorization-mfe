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
declare const _default: ({ baseUrl, loadResourcesPath, loadResourceByIdPath, createResourcePath, deleteResourceByIdPath, bulkDeleteResourcesPath, updateResourceActionsByIdPath, updateResourceActionScopesByIdAndActionIdPath, }?: ResourceService | undefined) => {
    loadResources: (pageSize: number, page: number) => Promise<Resource[]>;
    loadResourceById: (id: string) => Promise<Resource>;
    createResource: (body: Partial<Resource>) => Promise<any>;
    deleteResourceById: (id: string) => Promise<any>;
    bulkDeleteResources: (ids: string[]) => Promise<any>;
    updateResourceActions: (id: string, body: Partial<ResourceActions>) => Promise<any>;
    updateResourceActionScopes: (id: string, actionId: string, body: Partial<ScopeMapping>[]) => Promise<any>;
};
export default _default;
//# sourceMappingURL=resource.d.ts.map