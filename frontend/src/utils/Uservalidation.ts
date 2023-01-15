import validator from 'validator';

export const validateUpdateUser = (updateUser: any) => {
    if (!validator.isLength(updateUser.name, { min: 2 })) {
        throw new Error('Nome deve ter pelo menos 2 caracteres');
    }
    if (!validator.isEmail(updateUser.email)) {
        throw new Error('Email inválido');
    }
    if (!validator.isMobilePhone(updateUser.phone)) {
        throw new Error('Telefone inválido');
    }
    if (!validator.isLength(updateUser.cpf, { min: 11, max: 11 })) {
        throw new Error('CPF deve ter 11 dígitos');
    }
}