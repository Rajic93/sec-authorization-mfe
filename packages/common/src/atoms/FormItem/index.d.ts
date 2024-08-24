import { InputProps } from "antd";
import { SyntheticEvent } from "react";
import { TextAreaProps } from "antd/es/input";
export interface onKeyDownType {
    target: SyntheticEvent<HTMLInputElement> & {
        value: string;
    };
    which: number;
}
interface FormItemProps {
    name: string;
    label?: string;
    placeholder?: string;
    error?: string | null;
    value?: string | number | bigint | readonly string[] | boolean | undefined;
    onInputChange: (key: string, value: string | number | boolean) => void;
    type?: string;
    preventSpaceInput?: boolean;
    spaceReplacementChar?: string;
}
declare const FormItem: ({ name, label, placeholder, error, value, onInputChange, type, preventSpaceInput, spaceReplacementChar, ...props }: FormItemProps & InputProps & TextAreaProps) => import("react/jsx-runtime").JSX.Element;
export default FormItem;
//# sourceMappingURL=index.d.ts.map