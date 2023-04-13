'use strict';

// const moment = require('moment');


const relationParser = (dataItem, relationName) => {

  // console.log('QUI datum ->', dataItem);
  // console.log('QUI name ->', relationName);
  // if (typeof dataItem[relationName] !== undefined) console.log('QUI datum[name] ->', dataItem[relationName]);
  // console.log('----------');

  let keyID;

  switch(relationName) {

    case 'ambito':
      keyID = strapi.entityService.findMany('api::ambiti.ambiti', {
        fields: ['id'],
        filters: {codice: dataItem[relationName]}
      });
      keyID.then(
        result => insertRelationId(result[0].id),
        error => console.error('Error ->', error)
      )
      keyID.catch( alert => console.error('Alert ->', alert) )
      break;

    case 'dimensione':
      keyID = strapi.entityService.findMany('api::dimensioni.dimensioni', {
        fields: ['id'],
        filters: {codice: dataItem[relationName]}
      });
      keyID.then(
        result => insertRelationId(result[0].id),
        error => console.error('Error ->', error)
      )
      keyID.catch( alert => console.error('Alert ->', alert) )
      break;

    case 'tipologia':
      keyID = strapi.entityService.findMany('api::tipologie.tipologie', {
        fields: ['id'],
        filters: {codice: dataItem[relationName]}
      });
      keyID.then(
        result => insertRelationId(result[0].id),
        error => console.error('Error ->', error)
      )
      keyID.catch( alert => console.error('Alert ->', alert) )
      break;

    case 'sfondo':
      keyID = strapi.entityService.findMany('api::sfondi.sfondi', {
        fields: ['id'],
        filters: {codice: dataItem[relationName]}
      });
      keyID.then(
        result => insertRelationId(result[0].id),
        error => console.error('Error ->', error)
      )
      keyID.catch( alert => console.error('Alert ->', alert) )
      break;

    case 'motorizzato':
      keyID = strapi.entityService.findMany('api::motorizzato.motorizzato', {
        fields: ['id'],
        filters: {codice: dataItem[relationName]}
      });
      keyID.then(
        result => insertRelationId(result[0].id),
        error => console.error('Error ->', error)
      )
      keyID.catch( alert => console.error('Alert ->', alert) )
      break;

    case 'modello':
      keyID = strapi.entityService.findMany('api::modelli.modelli', {
        fields: ['id'],
        filters: {codice: dataItem[relationName]}
      });
      keyID.then(
        result => insertRelationId(result[0].id),
        error => console.error('Error ->', error)
      )
      keyID.catch( alert => console.error('Alert ->', alert) )
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
  // dataItem.createdAt = `${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}`;
  // dataItem.publishedAt = `${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}`;
  // dataItem.updateAt = `${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}`;
};



/**
 * @desc Check if a record exist in a collection type
 * @param {string} slug Collection Type name
 * @param {object} record Record to insert or update
 * @returns
 */
const collectioTypeRecordExist = async (slug, record, existingRecords) => {
  // let records;

  // switch (slug) {
  //   case 'api::ambiti.ambiti':
  //     records = strapi.entityService.findMany(slug, {
  //       fields: ['codice'],
  //       filters: {codice: record.codice}
  //     });
  //     records.then(
  //       result => existingRecords = result,
  //       error => console.error('Error ->', error)
  //     );
  //     records.catch( alert => console.error('Alert ->', alert) )
  //     break;

  //   default:
  //     existingRecords = [];
  //     break;
  // }
}


module.exports = {
  relationParser,
  collectioTypeRecordExist,
};
