import CreateResourceForm from "../molecules/CreateResourceForm";
import PageLayout from "../templates/PageLayout";

const Resources =() => {
    return (
        <PageLayout>
            <CreateResourceForm onSubmit={(resource) => console.log({ resource })} />
        </PageLayout>
    )
}

export default Resources