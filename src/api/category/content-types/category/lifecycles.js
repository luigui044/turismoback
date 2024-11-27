const { nanoid } = require('nanoid');

module.exports = {
    beforeCreate(event) {
        const { data } = event.params;

        // Genera un UID aleatorio si no está definido
        if (!data.uid) {
            data.uid = nanoid(10); // Cambia "10" por la longitud deseada
        }
    },
    beforeUpdate(event) {
        const { data } = event.params;

        // Asegura que siempre haya un UID
        if (!data.uid) {
            data.uid = nanoid(10);
        }
    }
};
