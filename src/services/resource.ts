import axios from 'axios';
import { Resource } from "../dto/Resource.ts";
import { ResourceActions } from "../templates/ResourceForm/components/ResourceActions.tsx";

export type ScopeMapping = {
    name: string;
    propertyPath?: string;
};

const instance = axios.create({ baseURL: 'http://localhost:3000/'});

export const loadResources = async (): Promise<Resource[]> => instance.get('/resources').then((res) => res.data);

export const loadResourceById = async (id: string) => instance.get(`/resources/${id}`).then((res) => res.data);

export const deleteResourceById = async (id: string) => instance.delete(`/resources/${id}`).then((res) => res.data);

export const createResource = async (body: Partial<Resource>) => instance.post('/resources', body).then((res) => res.data);

export const updateResourceActions = async (id: string, body: Partial<ResourceActions>) => instance.patch(`/resources/${id}/actions`, body).then((res) => res.data);

export const updateResourceActionScopes = async (id: string, actionId: string, body: ScopeMapping[]) => instance.patch(`/resources/${id}/actions/${actionId}/scopes`, body).then((res) => res.data);