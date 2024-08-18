import {Breadcrumb, Layout} from "antd";

const PageLayout = ({ children }) => (
    <Layout style={{ padding: 10 }}>
        <Layout.Content>
            <div
                style={{ paddingLeft: 24, paddingRight: 24 }}
            >
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div
                style={{ paddingLeft: 24, paddingRight: 24 }}
            >
                {children}
            </div>
        </Layout.Content>
    </Layout>
)

export default PageLayout;
