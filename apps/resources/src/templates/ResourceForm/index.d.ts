import { ScopeModel } from "./components/Scope.tsx";
import { Resource } from "../../dto/Resource.ts";
import { ResourceFormTemplateModes } from "./types.ts";
export interface ScopeConfig {
    templateStartVisible?: boolean;
}
export interface ResourceFormTemplateProps {
    onSubmit?: (record: Partial<Resource>, id?: string) => void;
    resourceLoad?: (id: string) => Promise<Resource>;
    resourceCreate?: (resource: Partial<Resource>) => Promise<Resource>;
    resourceActionsPatch?: (id: string, resource: Partial<Resource>) => Promise<Resource>;
    resourceActionScopesPatch?: (id: string, actionId: string, resource: Partial<ScopeModel>[]) => Promise<Resource>;
    mode?: ResourceFormTemplateModes;
    scopesConfig?: ScopeConfig;
    navigateBackOnSubmit?: boolean;
    navigateOnSubmitTo?: string;
}
declare const ResourceFormTemplate: ({ onSubmit, mode, resourceLoad, resourceCreate, resourceActionsPatch, resourceActionScopesPatch, scopesConfig, navigateBackOnSubmit, navigateOnSubmitTo, }: ResourceFormTemplateProps) => import("react/jsx-runtime").JSX.Element;
export default ResourceFormTemplate;
//# sourceMappingURL=index.d.ts.map