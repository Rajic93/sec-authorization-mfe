import type { NotificationArgsProps } from 'antd';
import { Resource } from "../dto/Resource.ts";
import { ResourceService } from "../services/resource.ts";
type NotificationPlacement = NotificationArgsProps['placement'];
export interface ResourcesRoutesConfig {
    home: string;
    list: string;
    create: string;
    edit: string;
}
export interface ResourcesEvents {
    onCreateEvent?: (record: Partial<Resource>) => Promise<void>;
    onEditEvent?: (id: string, record: Partial<Resource>) => Promise<void>;
    onDeleteEvent?: (ids: string[]) => Promise<void>;
}
export interface ResourceFormConfig {
    navigateBackOnCreate?: boolean;
    navigateBackOnEdit?: boolean;
    navigateOnCreateTo?: string;
    navigateOnEditTo?: string;
}
export interface ResourceNotificationsConfig {
    placement?: NotificationPlacement;
    editSuccessMessage?: string;
    createSuccessMessage?: string;
    deleteSuccessMessage?: string;
}
export interface ResourcesProps {
    routePaths?: ResourcesRoutesConfig;
    events?: ResourcesEvents;
    serviceConfig?: ResourceService;
    formConfig?: ResourceFormConfig;
    notificationsConfig?: ResourceNotificationsConfig;
}
export declare const Resources: ({ routePaths, events, serviceConfig, formConfig, notificationsConfig }: ResourcesProps) => import("react/jsx-runtime").JSX.Element;
export default Resources;
//# sourceMappingURL=Resources.d.ts.map