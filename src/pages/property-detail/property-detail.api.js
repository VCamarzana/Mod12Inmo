import Axios from "axios";

const url = `${process.env.BASE_API_URL}`;

const propertiesUrl = `${url}/properties`;
const contactUrl = `${url}/contact`;

export const getPropertyDetail = (id) =>
    Axios.get(`${propertiesUrl}/${id}`).then(({ data }) => data);

export const insertContactForm = form =>
    Axios.post(contactUrl, form).then(({ data }) => data);

