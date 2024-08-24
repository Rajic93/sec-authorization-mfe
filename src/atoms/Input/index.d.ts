interface TextInputProps {
    name: string;
    label?: string;
    placeholder?: string;
    error?: string | null;
    value?: string;
    onInputChange: (key: string, value: string | number | boolean) => void;
    type?: string;
    preventSpaceInput?: boolean;
    enabled?: boolean;
    spaceReplacementChar?: string;
}
declare const TextInput: ({ name, label, placeholder, error, value, onInputChange, preventSpaceInput, spaceReplacementChar, enabled, ...props }: TextInputProps) => import("react/jsx-runtime").JSX.Element;
export default TextInput;
//# sourceMappingURL=index.d.ts.map