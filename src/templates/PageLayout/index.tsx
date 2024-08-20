import React, {ReactNode, useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Col, Layout, Row, Typography } from "antd";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import capitalize from "lodash/capitalize";
import Link from '../../atoms/Link'

const backgroundColor = '#FCFCFC';
const border = '1px solid rgba(28, 49, 68, 0.1)';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: 10,
    backgroundColor,
};

const contentStyle: React.CSSProperties = {
    minHeight: 120,
    padding: 10,
    backgroundColor,
};

const siderStyle: React.CSSProperties = {
    lineHeight: '120px',
    color: '#fff',
    backgroundColor,
    borderRight: border,
};

const footerStyle: React.CSSProperties = {
    backgroundColor,
    borderTop: border
};

const layoutStyle = {
    width: '100vw',
    minHeight: '100vh',
    overflow: 'scroll',
};

interface PageLayoutProps {
    shouldShowBreadcrumbs?: boolean;
}

export interface ReactNodeWithChildren {
    children: ReactNode;
}

const PageLayout = ({ children, shouldShowBreadcrumbs = false }: PageLayoutProps & ReactNodeWithChildren) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const pathArray = location.pathname
        .split('/')
        .filter((e) => e);
    const isLastElement = (index: number) => index === pathArray.length - 1;
    const breadcrumbStyleFactory = (index: number) => ({
        cursor: !isLastElement(index) ? 'pointer' : 'default',
        color: '1px solid rgba(28, 49, 68, 0.1)'
    });
    const onBreadcrumbClick = (index: number) => !isLastElement(index) &&
        navigate(pathArray.slice(0, index + 1).join('/'));

    return (
        <Layout style={layoutStyle}>
            <Sider
                trigger={!collapsed ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={siderStyle}
            >
                <Row>
                    <Col span={24} style={{ paddingTop: 16 }}>
                        <Row justify='start' align="middle" style={{ paddingLeft: 16, paddingRight: 16 }}>
                            <Link
                                to="/"
                                style={{ display: 'inline-block', width: '100%', height: 40, cursor: 'pointer', textAlign: 'left' }}
                                text="Home"
                        />
                        </Row>
                        <Row justify='start' align="middle" style={{ paddingLeft: 16, paddingRight: 16 }}>
                            <Link
                                to="/resources"
                                style={{ display: 'inline-block', width: '100%', height: 40, cursor: 'pointer', textAlign: 'left' }}
                                text="Resources"
                        />
                        </Row>
                    </Col>
                </Row>
            </Sider>
            <Layout>
                {shouldShowBreadcrumbs && (
                    <Header style={headerStyle}>
                        <Breadcrumb
                            items={pathArray
                                .map((title, index) => ({
                                    title: (
                                        <Typography.Text
                                            onClick={() => onBreadcrumbClick(index)}
                                            style={breadcrumbStyleFactory(index)}
                                        >
                                            {capitalize(title)}
                                        </Typography.Text>
                                    ),
                                }))}
                        />
                    </Header>
                )}
                <Content style={contentStyle}>
                    {children}
                </Content>
                <Footer style={footerStyle}>Footer</Footer>
            </Layout>
        </Layout>
    );
}

export default PageLayout;
