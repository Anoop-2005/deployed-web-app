import { post } from '../services/Endpoint.js';

export const askBlogAssistant = (data) => post("/chat", data)
