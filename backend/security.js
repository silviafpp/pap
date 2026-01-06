const argon2 = require('argon2');

const passwordUtils = {
    // Função para encriptar
    hashPassword: async (password) => {
        try {
            return await argon2.hash(password);
        } catch (err) {
            throw new Error('Erro ao processar hash da password');
        }
    },

    // Função para verificar (usada no Login)
    verifyPassword: async (hash, password) => {
        try {
            return await argon2.verify(hash, password);
        } catch (err) {
            throw new Error('Erro ao verificar password');
        }
    }
};

module.exports = passwordUtils;