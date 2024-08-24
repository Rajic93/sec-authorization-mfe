export interface ScopeModel {
    name: string;
    key: string;
    mapping?: {
        path?: string;
    };
    propertyPath?: string;
}
interface ScopeProps {
    scope: ScopeModel;
    key: string;
    onNameChange: (scope: string, value: string | number | boolean) => void;
    onScopeRemove: (scope: string) => void;
    onMappingChange: (scope: string, value: string | number | boolean) => void;
    onMappingRemove: (scope: string) => void;
    onMappingAdd: (scope: string) => void;
}
declare const Scope: ({ scope, onNameChange, onScopeRemove, onMappingChange, onMappingRemove, onMappingAdd, }: ScopeProps) => import("react/jsx-runtime").JSX.Element;
export default Scope;
//# sourceMappingURL=Scope.d.ts.map