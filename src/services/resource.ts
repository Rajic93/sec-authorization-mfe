import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:3000/'});

export const loadResources = async () => instance.get('/resources').then((res) => res.data);
export const loadResourceById = async (id) => instance.get(`/resources/${id}`).then((res) => res.data);

export const createResource = async (body) => instance.post('/resources', body).then((res) => res.data);

export const updateResourceActions = async (id, body) => instance.patch(`/resources/${id}/actions`, body).then((res) => res.data);

export const updateResourceActionScopes = async (id, actionId, body) => instance.patch(`/resources/${id}/actions/${actionId}/scopes`, body).then((res) => res.data);