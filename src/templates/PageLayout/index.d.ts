import { ReactNode } from "react";
interface PageLayoutProps {
    shouldShowBreadcrumbs?: boolean;
}
export interface ReactNodeWithChildren {
    children: ReactNode;
}
declare const PageLayout: ({ children, shouldShowBreadcrumbs }: PageLayoutProps & ReactNodeWithChildren) => import("react/jsx-runtime").JSX.Element;
export default PageLayout;
//# sourceMappingURL=index.d.ts.map