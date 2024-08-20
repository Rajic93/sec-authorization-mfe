import TextInput from "../../../atoms/Input";

export type OnInputChange = (key: string, value: string | number | boolean) => void
export type ResourceInfoErrors = { name?: string | undefined | null; description?: string | undefined | null }
export type NameAndDescription = { name?: string; description?: string; };

interface ResourceInfoProps {
    onInputChange: OnInputChange;
    errors?: ResourceInfoErrors;
    values: { name?: string; description?: string };
    preventSpaceInName?: boolean;
    enabled?: boolean;
    spaceInNameReplacementChar?: string;
}

const ResourceInfo = ({
    onInputChange,
    errors,
    values,
    preventSpaceInName = true,
    enabled = true,
}: ResourceInfoProps) => (
    <>
        <TextInput
            label="Name"
            name="name"
            onInputChange={onInputChange}
            error={errors?.name}
            value={values.name}
            preventSpaceInput={preventSpaceInName}
            spaceReplacementChar="-"
            enabled={enabled}
        />
        <TextInput
            label="Description"
            name="description"
            type="textarea"
            onInputChange={onInputChange}
            value={values.description}
            error={errors?.description}
            enabled={enabled}
        />
    </>
);

export default ResourceInfo;
