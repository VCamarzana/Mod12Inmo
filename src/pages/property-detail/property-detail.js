import { getPropertyDetail, insertContactForm } from "./property-detail.api";
import { history } from "../../core/router";
import { setPropertyValues } from "./property-detail.helpers";
import { onUpdateField, onSubmitForm, onSetError, onSetFormErrors } from "../../common/helpers"
import { mapPropertyDetailFromApiToVM, } from "./property-detail.mappers";
import { formValidation } from "./property-detail.validators";
import { getEquipmentsList } from "../../common/api";

const params = history.getParams();

Promise.all([
    getPropertyDetail(params.id),
    getEquipmentsList(),
]).then(([propertyDetails, equipments]) => {
    loadPropertyDetails(propertyDetails, equipments);
});

const loadPropertyDetails = (propertyDetails, equipments) => {
    const vmPropertyDetails = mapPropertyDetailFromApiToVM(propertyDetails, equipments);
    setPropertyValues(vmPropertyDetails);
};

let form = {
    email: "",
    message: "",
};

onUpdateField("email", event => {
    const value = event.target.value;
    form = { ...form, email: value };

    formValidation.validateField("email", form.email).then(result => {
        onSetError("email", result);
    });
});

onUpdateField("message", event => {
    const value = event.target.value;
    form = { ...form, message: value };

    formValidation.validateField("message", form.message).then(result => {
        onSetError("message", result);
    });
})

const clearForm = () => {
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
    form = { ...form, email: "", message: "" };
}

const onSave = () => {
    insertContactForm(form);
    alert("Gracias por contactar con nosotros. Te responderemos enseguida.");
    clearForm();
}

onSubmitForm("contact-button", () => {
    formValidation.validateForm(form).then(result => {
        onSetFormErrors(result);
        if (result.succeeded) {
            onSave();
        }
    });
});
