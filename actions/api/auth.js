import API from "./index";

export const signIn = (formData) => API.post('/auth/signin', formData);
export const signUp = (formData) => API.post('/auth/register', formData);
export const getUserByEmail = (email) => API.get('/user/' + email);
