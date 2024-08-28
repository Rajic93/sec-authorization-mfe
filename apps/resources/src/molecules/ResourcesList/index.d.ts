import { Resource } from "../../dto/Resource.ts";
interface ResourceListProps {
    resourcesLoad: (pageSize: number, pageNumber: number) => Promise<Resource[]>;
    resourceDelete?: (ids: string[]) => Promise<Resource[]>;
    resourcesBulkDelete?: (id: string[]) => Promise<Resource[]>;
    onDelete?: (ids: string[]) => void;
    defaultPageSize?: number;
}
declare const ResourceList: ({ defaultPageSize, resourcesLoad, resourcesBulkDelete, onDelete }: ResourceListProps) => import("react/jsx-runtime").JSX.Element;
export default ResourceList;
//# sourceMappingURL=index.d.ts.map