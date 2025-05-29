import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::empresa.empresa', ({ strapi }) => ({
    async create(ctx) {
        // 1. Ejecuta la creación original
        const response = await super.create(ctx);

        try {
            // 2. Obtener los datos de la empresa recién creada
            const empresa = response.data;

            // 3. Opcional: obtener email de la empresa
            const email = empresa?.attributes?.email;

            if (email) {
                // 4. Enviar el correo
                await strapi.plugin('email').service('email').send({
                    to: email,
                    subject: 'Confirmación de registro',
                    text: `Hola ${empresa.attributes.nombre_comercial}, tu empresa ha sido registrada exitosamente.`,
                    html: `<p>Hola <strong>${empresa.attributes.nombre_comercial}</strong>, tu empresa ha sido registrada exitosamente.</p>`,
                });

                strapi.log.info(`Correo enviado a ${email}`);
            } else {
                strapi.log.warn('No se encontró email para enviar la confirmación.');
            }
        } catch (error) {
            strapi.log.error('Error al enviar correo de confirmación:', error);

        }

        // 5. Retorna la respuesta original
        return response;
    },
}));
