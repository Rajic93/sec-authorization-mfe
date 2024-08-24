import { Resource } from "../../dto/Resource.ts";
interface ResourceListProps {
    resourcesLoad: () => Promise<Resource[]>;
    resourceDelete: (id: string) => Promise<Resource[]>;
    onDelete?: (ids: string[]) => void;
}
declare const ResourceList: ({ resourcesLoad, resourceDelete, onDelete }: ResourceListProps) => import("react/jsx-runtime").JSX.Element;
export default ResourceList;
//# sourceMappingURL=index.d.ts.map