interface CheckboxProps {
    name: string;
    label?: string;
    placeholder?: string;
    error?: string | null;
    value?: boolean;
    onInputChange: (key: string, value: string | number | boolean) => void;
    type?: string;
    preventSpaceInput?: boolean;
    spaceReplacementChar?: string;
}
declare const Checkbox: ({ name, label, error, value, onInputChange, }: CheckboxProps) => import("react/jsx-runtime").JSX.Element;
export default Checkbox;
//# sourceMappingURL=index.d.ts.map