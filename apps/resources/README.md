# `@alx_rajic_auth/resources`

[![npm version](https://img.shields.io/npm/v/@alx_rajic_auth/resources.svg)](https://www.npmjs.com/package/@alx_rajic_auth/resources)
[![Build Status](https://img.shields.io/travis/your-username/your-package-name.svg)](https://travis-ci.org/your-username/your-package-name)
[![License](https://img.shields.io/npm/l/your-package-name.svg)](https://github.com/your-username/your-package-name/blob/main/LICENSE)

A Resources management micro-frontend, with creation, listing, editing and removal. 

## Installation

Install the package using npm or yarn:

```bash
npm install @alx_rajic_auth/resources
# or
yarn add @alx_rajic_auth/resources
```

## Usage

Basic ussage

```javascript
import Resources from '@alx_rajic_auth/resources';
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

#### `edit: string```
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

This project is licensed under the MIT License - see the [LICENSE](https://github.com/your-username/@alx_rajic_auth/resources/blob/main/LICENSE) file for details.
