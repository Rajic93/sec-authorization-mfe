export interface Scope {
    name: string;
    propertyPath?: string;
}

export interface Resource {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null,
    scopes: Scope[],
    actionId?: string,
    readEnabled: boolean,
    createEnabled: boolean,
    patchEnabled: boolean,
    deleteEnabled: boolean,
    updateEnabled: boolean
}
