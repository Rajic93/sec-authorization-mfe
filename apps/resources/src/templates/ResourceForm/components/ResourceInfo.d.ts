export type OnInputChange = (key: string, value: string | number | boolean) => void;
export type ResourceInfoErrors = {
    name?: string | undefined | null;
    description?: string | undefined | null;
};
export type NameAndDescription = {
    name?: string;
    description?: string;
};
interface ResourceInfoProps {
    onInputChange: OnInputChange;
    errors?: ResourceInfoErrors;
    values: {
        name?: string;
        description?: string;
        id?: string;
        createdAt?: string;
        updatedAt?: string;
    };
    preventSpaceInName?: boolean;
    spaceInNameReplacementChar?: string;
}
declare const ResourceInfo: ({ onInputChange, errors, values, preventSpaceInName, }: ResourceInfoProps) => import("react/jsx-runtime").JSX.Element;
export default ResourceInfo;
//# sourceMappingURL=ResourceInfo.d.ts.map