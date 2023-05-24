import { getPropertyList } from "./property-list.api";
import { mapFilterToQueryParams, mapPropertyListFromApiToVM } from "./property-list.mappers";
import { addPropertyRows, setOptions, clearPropertyRows } from "./property-list.helpers";
import { roomOptions, bathroomOptions, minPriceOptions, maxPriceOptions } from "./property-list.constants";
import { onUpdateField, onSubmitForm } from "../../common/helpers"
import { getSaleTypeList, getProvincesList } from "../../common/api";

Promise.all([
    getPropertyList(),
    getSaleTypeList(),
    getProvincesList(),
]).then(([propertyList, saleTypeList, provincesList]) => {
    loadPropertyList(propertyList);
    setOptions(saleTypeList, "select-sale-type", "Tipo de operación");
    setOptions(provincesList, "select-province", "Dónde");
    setOptions(roomOptions, "select-room", "Habitaciones");
    setOptions(bathroomOptions, "select-bathroom", "Baños");
    setOptions(minPriceOptions, "select-min-price", "Min (EUR)");
    setOptions(maxPriceOptions, "select-max-price", "Max (EUR)");
});

const loadPropertyList = propertyList => {
    const vmPropertyList = mapPropertyListFromApiToVM(propertyList);
    addPropertyRows(vmPropertyList);
};

let filter = {
    saleTypeId: "",
    provinceId: "",
    minRooms: "",
    minBathrooms: "",
    minPrice: "",
    maxPrice: "",
};

onUpdateField("select-sale-type", (event) => {
    const value = event.target.value;
    filter = { ...filter, saleTypeId: value, };
});

onUpdateField("select-province", (event) => {
    const value = event.target.value;
    filter = { ...filter, provinceId: value, };
});

onUpdateField("select-room", (event) => {
    const value = event.target.value;
    filter = { ...filter, minRooms: value, };
});

onUpdateField("select-bathroom", (event) => {
    const value = event.target.value;
    filter = { ...filter, minBathrooms: value, };
});

onUpdateField("select-min-price", (event) => {
    const value = event.target.value;
    filter = { ...filter, minPrice: value, };
});

onUpdateField("select-max-price", (event) => {
    const value = event.target.value;
    filter = { ...filter, maxPrice: value, };
});

onSubmitForm("search-button", () => {
    const queryParams = mapFilterToQueryParams(filter);
    clearPropertyRows();
    getPropertyList(queryParams).then(propertyList => {
        loadPropertyList(propertyList);
        console.log({ filter });
    });
})
