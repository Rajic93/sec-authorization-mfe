import { OnInputChange } from "./ResourceInfo.tsx";
import Checkbox from "../../../atoms/Checkbox";

export type ResourceActions = {
    readEnabled?: boolean;
    createEnabled?: boolean;
    updateEnabled?: boolean;
    patchEnabled?: boolean;
    deleteEnabled?: boolean;
    actionId?: string;
}
export interface ResourceActionsProps extends ResourceActions {
    onInputChange: OnInputChange;
}

const ResourceActions = ({
    onInputChange,
    readEnabled,
    createEnabled,
    updateEnabled,
    patchEnabled,
    deleteEnabled,
}: ResourceActionsProps) => (
    <>
        <Checkbox
            label="Read Enabled"
            name="readEnabled"
            value={readEnabled}
            onInputChange={onInputChange}
        />
        <Checkbox
            label="Create Enabled"
            name="createEnabled"
            value={createEnabled}
            onInputChange={onInputChange}
        />
        <Checkbox
            label="Update Enabled"
            name="updateEnabled"
            value={updateEnabled}
            onInputChange={onInputChange}
        />
        <Checkbox
            label="Patch Enabled"
            name="patchEnabled"
            value={patchEnabled}
            onInputChange={onInputChange}
        />
        <Checkbox
            label="Delete Enabled"
            name="deleteEnabled"
            value={deleteEnabled}
            onInputChange={onInputChange}
        />

    </>
)

export default ResourceActions;
