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
    };
    preventSpaceInName?: boolean;
    enabled?: boolean;
    spaceInNameReplacementChar?: string;
}
declare const ResourceInfo: ({ onInputChange, errors, values, preventSpaceInName, enabled, }: ResourceInfoProps) => import("react/jsx-runtime").JSX.Element;
export default ResourceInfo;
//# sourceMappingURL=ResourceInfo.d.ts.map