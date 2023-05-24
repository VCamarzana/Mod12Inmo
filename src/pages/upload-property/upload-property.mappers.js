
export const mapNewPropertyListFromVMToApi = newPropertyList => {
    return newPropertyList.map(newProperty => mapNewPropertyFromVMToApi(newProperty));
};

export const mapNewPropertyFromVMToApi = property => {
    return {
        ...property,
        price: parseInt(property.price),
        squareMeter: parseInt(property.squareMeter),
        rooms: parseInt(property.rooms),
        bathrooms: parseInt(property.bathrooms),
    };
};
