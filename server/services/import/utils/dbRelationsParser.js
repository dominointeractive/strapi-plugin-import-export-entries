'use strict';

const moment = require('moment');


const relationParser = (dataItem, relationName) => {

  console.log('QUI datum ->', dataItem);
  console.log('QUI name ->', relationName);
  console.log('QUI datum[name] ->', dataItem[relationName]);
  console.log('----------');

  switch(relationName) {

    case 'ambito':
      let keyID = strapi.entityService.findMany('api::ambiti.ambiti', {
        fields: ['id'],
        filters: {codice: dataItem[relationName]}
      });
      keyID.then(
        result => insertRelationId(result[0].id),
        error => console.error('QUI Error ->', error)
      )
      keyID.catch(
        alert => console.error('QUI Alert ->', alert)
      )
      break;
  }

  const insertRelationId = (id) => {
    try {
      dataItem[relationName] = JSON.parse(id);
    } catch (err) {
      strapi.log.error(err);
    }
  }

  // Inserimento di data di creazione, pubblicazione e update
  dataItem.createdAt = `${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}`;
  dataItem.publishedAt = `${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}`;
  dataItem.updateAt = `${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}`;
};


module.exports = {
  relationParser,
};
