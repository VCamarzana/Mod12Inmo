import Axios from "axios";

const url = `${process.env.BASE_API_URL}/properties`;

export const insertNewProperty = newProperty =>
    Axios.post(url, newProperty).then(({ data }) => data);
