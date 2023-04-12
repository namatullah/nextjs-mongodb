import * as api from "../../api/auth"

export const signUp = async (formData) => await api.signUp(formData);

export const getUserByEmail = async (email) => await api.getUserByEmail(email);
