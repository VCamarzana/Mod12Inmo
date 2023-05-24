import Axios from "axios";

const url = `${process.env.BASE_API_URL}`;
const saleTypeListUrl = `${url}/saleTypes`;
const equipmentsListUrl = `${url}/equipments`;
const provincesListUrl = `${url}/provinces`;


export const getSaleTypeList = () =>
    Axios.get(saleTypeListUrl).then(({ data }) => data);

export const getEquipmentsList = () =>
    Axios.get(equipmentsListUrl).then(({ data }) => data);

export const getProvincesList = () =>
    Axios.get(provincesListUrl).then(({ data }) => data);