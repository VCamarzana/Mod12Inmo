
export const mapPropertyDetailListFromApiToVM = propertyList => {
    return propertyList.map((property) => mapPropertyDetailFromApiToVM(property));
};

const getEquipments = (property, equipments) => property.equipmentIds.map(id => {
    const equipment = equipments.find(equipment => equipment.id === id);
    return equipment ? equipment.name : null;
});

export const mapPropertyDetailFromApiToVM = (property, equipments) => {
    return {
        id: property.id,
        title: property.title,
        notes: property.notes,
        price: `${property.price.toLocaleString()} €`,
        city: property.city,
        squareMeter: `${property.squareMeter}m2`,
        rooms: `${property.rooms} ${getRoomWord(property.rooms)}`,
        bathrooms: `${property.bathrooms} ${getBathroomWord(property.bathrooms)}`,
        locationUrl: property.locationUrl,
        mainFeatures: property.mainFeatures,
        equipments: getEquipments(property, equipments),
        mainImage: Array.isArray(property.images) ? property.images[0] : [],
        images: property.images,
    };
};

const getRoomWord = rooms => {
    return rooms > 1 ? "habitaciones" : "habitación";
};

const getBathroomWord = bathrooms => {
    return bathrooms > 1 ? "baños" : "baño";
};



