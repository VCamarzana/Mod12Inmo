import { Validators, createFormValidation } from '@lemoncode/fonk';
import { isNumber } from '@lemoncode/fonk-is-number-validator';
import { isUrl } from "@lemoncode/fonk-is-url-validator";
import { arrayRequired } from "@lemoncode/fonk-array-required-validator";


const validationSchema = {
    field: {
        title: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
        ],
        notes: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
        ],
        email: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
            {
                validator: Validators.email,
                message: 'Email no válido',
            },
        ],
        phone: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
            {
                validator: isNumber.validator,
                message: 'Debe escribir un número',
            },
            {
                validator: Validators.pattern,
                customArgs: { pattern: '^(6|7|8|9)\\d{8}$' },
                message: "Introduzca un número de teléfono válido"
            },
        ],
        price: [
            {
                validator: Validators.required,
                message: 'Campo requerido',

            },
            {
                validator: isNumber.validator,
                message: 'Debe escribir un número',
            },

        ],
        address: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
        ],
        city: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
        ],
        provinceId: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
        ],
        squareMeter: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
            {
                validator: isNumber.validator,
                message: 'Debe escribir un número',
            },
        ],
        rooms: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
            {
                validator: isNumber.validator,
                message: 'Debe escribir un número',
            },
        ],
        bathrooms: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
            {
                validator: isNumber.validator,
                message: 'Debe escribir un número',
            },
        ],
        locationUrl: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
            {
                validator: isUrl.validator,
                message: 'Debe ser una url válida',
            },
        ],
        saleTypes: [
            {
                validator: arrayRequired.validator,
                message: 'Elija una opción',
            },
        ],
    },
};


export const formValidation = createFormValidation(validationSchema);
