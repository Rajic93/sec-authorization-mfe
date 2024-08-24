import { OnInputChange } from "./ResourceInfo.tsx";
export type ResourceActions = {
    readEnabled?: boolean;
    createEnabled?: boolean;
    updateEnabled?: boolean;
    patchEnabled?: boolean;
    deleteEnabled?: boolean;
    actionId?: string;
};
export interface ResourceActionsProps extends ResourceActions {
    onInputChange: OnInputChange;
}
declare const ResourceActions: ({ onInputChange, readEnabled, createEnabled, updateEnabled, patchEnabled, deleteEnabled, }: ResourceActionsProps) => import("react/jsx-runtime").JSX.Element;
export default ResourceActions;
//# sourceMappingURL=ResourceActions.d.ts.map