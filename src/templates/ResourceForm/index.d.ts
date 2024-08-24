import { ScopeModel } from "./components/Scope.tsx";
import { Resource } from "../../dto/Resource.ts";
import { ResourceFormTemplateModes } from "./types.ts";
interface ResourceFormTemplateProps {
    onSubmit?: (record: Partial<Resource>, id?: string) => void;
    resourceLoad?: (id: string) => Promise<Resource>;
    resourceCreate?: (resource: Partial<Resource>) => Promise<Resource>;
    resourceActionsPatch?: (id: string, resource: Partial<Resource>) => Promise<Resource>;
    resourceActionScopesPatch?: (id: string, actionId: string, resource: Partial<ScopeModel>[]) => Promise<Resource>;
    mode?: ResourceFormTemplateModes;
}
declare const ResourceFormTemplate: ({ onSubmit, mode, resourceLoad, resourceCreate, resourceActionsPatch, resourceActionScopesPatch, }: ResourceFormTemplateProps) => import("react/jsx-runtime").JSX.Element;
export default ResourceFormTemplate;
//# sourceMappingURL=index.d.ts.map