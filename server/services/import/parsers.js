'use strict';

const csvtojson = require('csvtojson');

const { isArraySafe } = require('../../../libs/arrays');
const { isObjectSafe } = require('../../../libs/objects');
const { getModelAttributes } = require('../../utils/models');
const { relationParser } = require('./utils/dbRelationsParser');
const moment = require('moment');

const parseCsv = async (dataRaw, { slug }) => {

  console.log("                        ");
  console.log("***** START PARSING CSV *****");
  console.log("                        ");

  let data = await csvtojson().fromString(dataRaw);

  // console.log('QUI data ->', data);
  // console.log('----------');

  const relationNames = getModelAttributes(slug, { filterType: ['component', 'dynamiczone', 'media', 'relation'] }).map((a) => a.name);

  console.log('QUI relationNames ->', relationNames);
  console.log('----------');

  data = data.map((datum) => {
    for (let name of relationNames) {

      // Inserimento di data di creazione, pubblicazione e update
      datum.createdAt = `${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}`;
      datum.publishedAt = `${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}`;
      datum.updateAt = `${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}`;

      relationParser(datum, name);
      /**
       Start CUSTOM
      */
      // console.log('QUI datum ->', datum);
      // console.log('QUI name ->', name);
      // console.log('QUI datum[name] ->', datum[name]);
      // console.log('----------');

      // let keyID;
      // switch(name) {
      //   case 'ambito':
      //     keyID = strapi.entityService.findMany('api::ambiti.ambiti', {
      //       fields: ['id'],
      //       filters: {codice: datum[name]}
      //     });
      //     keyID.then(
      //       result => {
      //         console.log('QUI Result ->', result)
      //         fun(result[0].id)
      //       },
      //       error => console.error('QUI Error ->', error)
      //     )
      //     keyID.catch(
      //       alert => console.error('QUI Alert ->', alert)
      //     )
      //     break;
      // }

      // const fun = (id) => {
      //   try {
      //     datum[name] = JSON.parse(id);
      //   } catch (err) {
      //     strapi.log.error(err);
      //   }
      // }
      /**
       End CUSTOM
      */

      // try {
      //     datum[name] = JSON.parse(datum[name]);
      //   } catch (err) {
      //     strapi.log.error(err);
      //   }
    }

    return datum;
  });

  return data;
};

const parseJson = async (dataRaw) => {
  let data = JSON.parse(dataRaw);
  return data;
};

const parseJso = async (dataRaw) => {
  if (!isObjectSafe(dataRaw) && !isArraySafe(dataRaw)) {
    throw new Error(`To import JSO, data must be an array or an object`);
  }

  return dataRaw;
};

const parsers = {
  csv: parseCsv,
  jso: parseJso,
  json: parseJson,
};

/**
 * Parse input data.
 * @param {("csv"|"jso"|"json")} format
 * @param {*} dataRaw
 * @param {Object} options
 * @param {string} options.slug
 */
const parseInputData = async (format, dataRaw, { slug }) => {
  const parser = parsers[format];
  if (!parser) {
    throw new Error(`Data input format ${format} is not supported.`);
  }

  const data = await parser(dataRaw, { slug });
  return data;
};

module.exports = {
  parseInputData,
};
