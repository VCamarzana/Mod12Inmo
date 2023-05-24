import { onUpdateField, onSubmitForm, onSetError, onSetFormErrors } from "../../common/helpers";
import { setCheckboxList, setOptionList, formatCheckboxId, onAddImage, onAddFeature, onRemoveFeature, formatDeleteFeatureButtonId } from "./upload-property.helpers";
import { insertNewProperty } from "./upload-property.api";
import { mapNewPropertyFromVMToApi } from "./upload-property.mappers";
import { formValidation } from "./upload-property.validators";
import { getSaleTypeList, getProvincesList, getEquipmentsList } from "../../common/api";

Promise.all([
    getSaleTypeList(),
    getEquipmentsList(),
    getProvincesList(),
]).then(([saleTypesList, equipmentsList, provincesList]) => {
    setCheckboxList(saleTypesList, "saleTypes");
    setCheckboxList(equipmentsList, "equipments");
    setOptionList(provincesList, "province");
});

let newProperty = {
    id: "",
    title: "",
    notes: "",
    email: "",
    phone: "",
    price: "",
    saleTypeIds: [],
    address: "",
    city: "",
    provinceId: "",
    squareMeter: "",
    rooms: "",
    bathrooms: "",
    locationUrl: "",
    mainFeatures: [],
    equipmentIds: [],
    images: [],
};

onUpdateField("title", event => {
    const value = event.target.value;
    newProperty = { ...newProperty, title: value };
    formValidation.validateField("title", newProperty.title).then(result => {
        onSetError("title", result);
    });
});

onUpdateField("notes", event => {
    const value = event.target.value;
    newProperty = { ...newProperty, notes: value };
    formValidation.validateField("notes", newProperty.notes).then(result => {
        onSetError("notes", result);
    });
});

onUpdateField("email", event => {
    const value = event.target.value;
    newProperty = { ...newProperty, email: value };
    formValidation.validateField("email", newProperty.email).then(result => {
        onSetError("email", result);
    });
});

onUpdateField("phone", event => {
    const value = event.target.value;
    newProperty = { ...newProperty, phone: value };
    formValidation.validateField("phone", newProperty.phone).then(result => {
        onSetError("phone", result);
    });
});

onUpdateField("price", event => {
    const value = event.target.value;
    newProperty = { ...newProperty, price: value };
    formValidation.validateField("price", newProperty.price).then(result => {
        onSetError("price", result);
    });
});

onUpdateField("saleTypes", event => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    const index = newProperty.saleTypeIds.indexOf(value);
    isChecked
        ? newProperty = { ...newProperty, saleTypeIds: [...newProperty.saleTypeIds, value] }
        : newProperty.saleTypeIds.splice(index, 1);

    formValidation.validateField("saleTypes", newProperty.saleTypeIds).then(result => {
        onSetError("saleTypes", result);
    });
});

onUpdateField("address", event => {
    const value = event.target.value;
    newProperty = { ...newProperty, address: value };
    formValidation.validateField("address", newProperty.address).then(result => {
        onSetError("address", result);
    });
});

onUpdateField("city", event => {
    const value = event.target.value;
    newProperty = { ...newProperty, city: value };
    formValidation.validateField("city", newProperty.city).then(result => {
        onSetError("city", result);
    });
});

onUpdateField("province", event => {
    const value = event.target.value;
    newProperty = { ...newProperty, provinceId: value };
    formValidation.validateField("province", newProperty.provinceId).then(result => {
        onSetError("province", result);
    });
});

onUpdateField("squareMeter", event => {
    const value = event.target.value;
    newProperty = { ...newProperty, squareMeter: value };
    formValidation.validateField("squareMeter", newProperty.squareMeter).then(result => {
        onSetError("squareMeter", result);
    });
});

onUpdateField("rooms", event => {
    const value = event.target.value;
    newProperty = { ...newProperty, rooms: value };
    formValidation.validateField("rooms", newProperty.rooms).then(result => {
        onSetError("rooms", result);
    });
});

onUpdateField("bathrooms", event => {
    const value = event.target.value;
    newProperty = { ...newProperty, bathrooms: value };
    formValidation.validateField("bathrooms", newProperty.bathrooms).then(result => {
        onSetError("bathrooms", result);
    });
});

onUpdateField("locationUrl", event => {
    const value = event.target.value;
    newProperty = { ...newProperty, locationUrl: value };

    formValidation.validateField("locationUrl", newProperty.locationUrl).then(result => {
        onSetError("locationUrl", result);
    });
});

onUpdateField("mainFeatures", event => {
    const value = event.target.value;
    newProperty = { ...newProperty, mainFeatures: value };

});

onUpdateField("equipments", event => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    const index = newProperty.equipmentIds.indexOf(value);
    isChecked
        ? newProperty = { ...newProperty, equipmentIds: [...newProperty.equipmentIds, value] }
        : newProperty.equipmentIds.splice(index, 1);

    formValidation.validateField("equipments", newProperty.equipmentIds).then(result => {
        onSetError("equipments", result);
    });
});

onUpdateField("images", event => {
    const value = event.target.value;
    newProperty = { ...newProperty, images: value };
    onAddImage(value);
});

onSubmitForm("insert-feature-button", () => {
    const value = document.getElementById("newFeature").value;
    if (value) {
        newProperty = { ...newProperty, mainFeatures: [...newProperty.mainFeatures, value] };
        const id = formatDeleteFeatureButtonId(value);
        onAddFeature(value);
        onSubmitForm(id, () => {
            onRemoveFeature(value);
            const index = newProperty.mainFeatures.indexOf(value);
            newProperty.mainFeatures.splice(index, 1);
        });

    }
});
const clearForm = () => {
    newFeature = { newFeature: null };
};

const onSave = () => {
    const apiNewProperty = mapNewPropertyFromVMToApi(newProperty);
    alert("Gracias por contactar con nosotros. Te responderemos enseguida.");
    return insertNewProperty(apiNewProperty);

};

onSubmitForm("save-button", () => {
    formValidation.validateForm(newProperty).then(result => {
        onSetFormErrors(result);
        if (result.succeeded) {
            onSave();
            console.log(newProperty)
        }
    });
});