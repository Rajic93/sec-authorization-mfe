import ResourceFormTemplate, {ResourceFormTemplateModes} from "../templates/ResourceForm";

const Resources =() => (
    <ResourceFormTemplate
        mode={ResourceFormTemplateModes.EDIT}
    />
);

export default Resources