'use strict';

/**
 * votelog service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::votelog.votelog');
