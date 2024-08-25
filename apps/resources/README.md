
[//]: # ([![npm version]&#40;https://img.shields.io/npm/v/@alx_rajic_auth/resources.svg&#41;]&#40;https://www.npmjs.com/package/@alx_rajic_auth/resources&#41;)
[//]: # ([![Build Status]&#40;https://img.shields.io/travis/your-username/your-package-name.svg&#41;]&#40;https://travis-ci.org/your-username/your-package-name&#41;)

A Resources management micro-frontend, with creation, listing, editing and removal. 

## Installation

Install the package using npm or yarn:

```bash
npm install @sec-authorize/resources
# or
yarn add @sec-authorize/resources
```

## Usage

Basic ussage

```javascript
import Resources from '@sec-authorize/resources';
import { BrowserRouter } from 'react-router-dom';

const ParentComponent = () => (
    <BrowserRouter>
        <Resources />
    </BrowserRouter>
);
```

## Props

### `routePaths: ResourcesRoutesConfig`

An optional configuration to set routes' pages paths.

#### `home: string`
Sets home page path. Default: `/`

#### `list: string`
Sets table of resources page path. Default: `/resources`

#### `create: string`
Sets create resource page path. Default: `/resources/create`

#### `edit: string`
Sets edit resource page path. Default: `/resources/:id`

### `events?: ResourcesEvents`

Event handlers.

#### `onCreateEvent?: (record: Partial<Resource>) => Promise<void>`
Event that will be triggered once resource creation form is submit;

#### `onEditEvent?: (id: string, record: Partial<Resource>) => Promise<void>`
Event that will be triggered once resource edit form is submit

#### `onDeleteEvent?: (ids: string[]) =>Promise <void>`
Event that will be triggered once resource delete button is pressed;

### `formConfig?: ResourceFormConfig`

Configuration of create and edit forms.

#### `navigateBackOnCreate?: boolean`

Navigate back on create success if flag is true.

#### `navigateBackOnEdit?: boolean`

Navigate back on edit success if flag is true.

#### `navigateOnCreateTo?: string`

Navigate to the provided url on create success. Overrides `navigateBackOnCreate`.

#### `navigateOnEditTo?: string`

Navigate to the provided url on edit success. Overrides `navigateBackOnEdit`.

### `notificationsConfig?: ResourceNotificationsConfig`

Configure notifications.

#### `placement?: NotificationPlacement`

Defines placement of the notification on screen. Enum: `topRight, topLeft, bottomRight, bottomLeft`

#### `editSuccessMessage?: string`

Message that is shown on create success. Default: `Resource successfully created.`.

#### `createSuccessMessage?: string`

Message that is shown on edit success. Default: `Resource successfully edited.`.

#### `deleteSuccessMessage?: string`

Message that is shown on delete success. Default: `Resource successfully deleted.`.

### `serviceConfig?: ResourceService`

Defines backend configuration to connect to.

#### `baseUrl?: string`

Base url of the backed application. Default: `http://localhost:3000`.

#### `createResourcePath?: string`

Path of the create resource `POST` route. Default: `/resources`.

#### `loadResourcesPath?: string`

Path of the load resources `GET` route. Default: `/resources`.

#### `loadResourceByIdPath?: string`

Path of the load resource by id `GET` route. Default: `/resources/:id`.

#### `deleteResourceByIdPath?: string`

Path of the delete resource `DELETE` route. Default: `/resources/:id`.

#### `bulkDeleteResourcesPath?: string`

Path of the bulk delete resources `DELETE` route. Default: `/resources`.

#### `updateResourceActionsByIdPath?: string`

Path of the update resource's actions `PATCH` route. Default: `/resources/:id/actions`.

#### `updateResourceActionScopesByIdAndActionIdPath?: string`

Path of the update resource's action's scopes `PATCH` route. Default: `/resources/:id/actions/:actionId/scopes`.

## Required Dependencies

- react
- react-dom
- react-router-dom
- react/jsx-runtime

## License

This project is released under the [MIT licence](https://www.mit.edu/~amini/LICENSE.md).
