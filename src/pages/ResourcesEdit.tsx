import PageLayout from "../templates/PageLayout";
import EditResourceForm from "../molecules/EditResourceForm";

const Resources =() => {
    return (
        <PageLayout>
            <EditResourceForm onSubmit={(resource) => console.log({ resource })} />
        </PageLayout>
    )
}

export default Resources