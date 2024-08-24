import { Resource } from "../dto/Resource.ts";
import { ResourceService } from "../services/resource.ts";
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
export declare const Resources: ({ routePaths, events, serviceConfig }: ResourcesProps) => import("react/jsx-runtime").JSX.Element;
export default Resources;
//# sourceMappingURL=Resources.d.ts.map