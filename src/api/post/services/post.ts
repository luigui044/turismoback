/**
 * post service
 */

import { factories } from '@strapi/strapi';
import slugify from 'slugify';

export default factories.createCoreService('api::post.post', ({ strapi }) => ({
    async beforeCreate(event) {
        const { data } = event.params;

        if (data.title) {
            data.slug = slugify(data.title, { lower: true });
        }
    },

    async beforeUpdate(event) {
        const { data } = event.params;

        if (data.title) {
            data.slug = slugify(data.title, { lower: true });
        }
    },
}));
