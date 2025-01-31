const { isArraySafe, toArray } = require('../../../libs/arrays');
const { ObjectBuilder, isObjectSafe } = require('../../../libs/objects');
const { CustomSlugs } = require('../../config/constants');
const { getModelAttributes, getModel } = require('../../utils/models');
const { findOrImportFile } = require('./utils/file');
const { parseInputData } = require('./parsers');
const { collectioTypeRecordExist } = require('./utils/dbRelationsParser');

/**
 * @typedef {Object} ImportDataRes
 * @property {Array<ImportDataFailures>} failures
 */
/**
 * Represents failed imports.
 * @typedef {Object} ImportDataFailures
 * @property {Error} error - Error raised.
 * @property {Object} data - Data for which import failed.
 */
/**
 * Import data.
 * @param {Array<Object>} dataRaw - Data to import.
 * @param {Object} options
 * @param {string} options.slug - Slug of the model to import.
 * @param {("csv" | "json")} options.format - Format of the imported data.
 * @param {Object} options.user - User importing the data.
 * @param {Object} options.idField - Field used as unique identifier.
 * @returns {Promise<ImportDataRes>}
 */
const importData = async (dataRaw, { slug, format, user, idField }) => {
  let data = await parseInputData(format, dataRaw, { slug });
  data = toArray(data);

  console.log("                        ");
  console.log("CSV DATA PARSED ->", data);
  console.log("                        ");

  let res;
  if (slug === CustomSlugs.MEDIA) {
    res = await importMedia(data, { user });
  } else {
    res = await importOtherSlug(data, { slug, user, idField });
  }

  return res;
};

const importMedia = async (fileData, { user }) => {
  const processed = [];
  for (let fileDatum of fileData) {
    let res;
    try {
      await findOrImportFile(fileDatum, user, { allowedFileTypes: ['any'] });
      res = { success: true };
    } catch (err) {
      strapi.log.error(err);
      res = { success: false, error: err.message, args: [fileDatum] };
    }
    processed.push(res);
  }

  const failures = processed.filter((p) => !p.success).map((f) => ({ error: f.error, data: f.args[0] }));

  return {
    failures,
  };
};

const importOtherSlug = async (data, { slug, user, idField }) => {

  console.log("                        ");
  console.log("***** START IMPORT *****");
  console.log("                        ");

  console.log('slug ->', slug);
  console.log('idField ->', idField);
  console.log("----------");

  const processed = [];
  for (let datum of data) {
    let res;
    try {
      console.log('datum ->', datum);
      console.log("----------");

      await updateOrCreate(user, slug, datum, idField);
      res = { success: true };
    } catch (err) {
      strapi.log.error(err);
      res = { success: false, error: err.message, args: [datum] };
    }
    processed.push(res);
  }

  const failures = processed.filter((p) => !p.success).map((f) => ({ error: f.error, data: f.args[0] }));

  return {
    failures,
  };
};

/**
 * Update or create entries for a given model.
 * @param {Object} user - User importing the data.
 * @param {string} slug - Slug of the model.
 * @param {Object} data - Data to update/create entries from.
 * @param {string} idField - Field used as unique identifier.
 * @returns Updated/created entry.
 */
const updateOrCreate = async (user, slug, data, idField = 'id') => {

  console.log('updateOrCreate ->', slug, data, idField);
  console.log("----------");

  // Controllo se ESISTE già un record identico a quello che si vuole inserire
  let existingRecords = [];
  // collectioTypeRecordExist(slug, data, existingRecords);
  switch (slug) {
    case 'api::ambiti.ambiti':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::dimensioni.dimensioni':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::tipologie.tipologie':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::sfondi.sfondi':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::motorizzato.motorizzato':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::mensole-cerniere.mensole-cerniere':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::porta-pedonale.porta-pedonale':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::guide.guide':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::emotional-light.emotional-light':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::maniglie.maniglie':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::materiali.materiali':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::disegno-esterno.disegno-esterno':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::finiture.finiture':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::colori.colori':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::oblo.oblo':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::tamp-oblo.tamp-oblo':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::cornici.cornici':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::sez-vetrata.sez-vetrata':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::tamp-vetr.tamp-vetr':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::tipo-sez-vetr.tipo-sez-vetr':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['codice'],
        filters: {codice: data.codice}
      });
      break;

    case 'api::modelli.modelli':
      // const idMateriale = await strapi.entityService.findMany('api::materiali.materiali', {
      //   fields: ['codice'],
      //   filters: {codice: data.materiali}
      // });
      // const idPortaPedonale = await strapi.entityService.findMany('api::porta-pedonale.porta-pedonale', {
      //   fields: ['codice'],
      //   filters: {codice: data.porta_pedonale}
      // });
      // const idManiglia = await strapi.entityService.findMany('api::maniglie.maniglie', {
      //   fields: ['codice'],
      //   filters: {codice: data.maniglie}
      // });
      // const idEmotionalLight = await strapi.entityService.findMany('api::emotional-light.emotional-light', {
      //   fields: ['codice'],
      //   filters: {codice: data.emotional_lights}
      // });
      // const idMensoleCerniere = await strapi.entityService.findMany('api::mensole-cerniere.mensole-cerniere', {
      //   fields: ['codice'],
      //   filters: {codice: data.mensole_cerniere}
      // });
      // const idGuide = await strapi.entityService.findMany('api::guide.guide', {
      //   fields: ['codice'],
      //   filters: {codice: data.guide}
      // });
      // const idMotorizzato = await strapi.entityService.findMany('api::motorizzato.motorizzato', {
      //   fields: ['codice'],
      //   filters: {codice: data.motorizzato}
      // });

      // const ids = await Promise.all([
      Promise.all([
        strapi.entityService.findMany('api::materiali.materiali', {
          fields: ['codice'],
          filters: {codice: data.materiali}
        }),
        strapi.entityService.findMany('api::porta-pedonale.porta-pedonale', {
          fields: ['codice'],
          filters: {codice: data.porta_pedonale}
        }),
        strapi.entityService.findMany('api::maniglie.maniglie', {
          fields: ['codice'],
          filters: {codice: data.maniglie}
        }),
        strapi.entityService.findMany('api::emotional-light.emotional-light', {
          fields: ['codice'],
          filters: {codice: data.emotional_lights}
        }),
        strapi.entityService.findMany('api::mensole-cerniere.mensole-cerniere', {
          fields: ['codice'],
          filters: {codice: data.mensole_cerniere}
        }),
        strapi.entityService.findMany('api::guide.guide', {
          fields: ['codice'],
          filters: {codice: data.guide}
        }),
        strapi.entityService.findMany('api::motorizzato.motorizzato', {
          fields: ['codice'],
          filters: {codice: data.motorizzato}
        })
      ]).then(ids => {
        console.log('IDS ->', ids);

        const idMateriale = ids[0][0].id;
        const idPortaPedonale = ids[1][0].id;
        const idManiglia = ids[2][0].id;
        const idEmotionalLight = ids[3][0].id;
        const idMensoleCerniere = ids[4][0].id;
        const idGuide = ids[5][0].id;
        const idMotorizzato = ids[6][0].id;

        console.log('idMateriale ->', idMateriale);
        console.log('idPortaPedonale ->', idPortaPedonale);
        console.log('idManiglia ->', idManiglia);
        console.log('idEmotionalLight ->', idEmotionalLight);
        console.log('idMensoleCerniere ->', idMensoleCerniere);
        console.log('idGuide ->', idGuide);
        console.log('idMotorizzato ->', idMotorizzato);
        console.log("----------");

        let findIds = new Promise(function() {
          strapi.entityService.findMany(slug, {
            fields: ['id'],
            filters: { $and: [
              {codice: data.codice},
              {materiali: idMateriale},
              {porta_pedonale: idPortaPedonale},
              {maniglie: idManiglia},
              {emotional_lights: idEmotionalLight},
              {mensole_cerniere: idMensoleCerniere},
              {guide: idGuide},
              {motorizzato: idMotorizzato},
            ]}
          });
        });

        findIds.then(results => {
          existingRecords = results
        });
        findIds.catch(error => {
          console.err(error);
        })
      });

      // existingRecords = await strapi.entityService.findMany(slug, {
      //   fields: ['id'],
      //   filters: { $and: [
      //     {codice: data.codice},
      //     {materiali: idMateriale},
      //     {porta_pedonale: idPortaPedonale},
      //     {maniglie: idManiglia},
      //     {emotional_lights: idEmotionalLight},
      //     {mensole_cerniere: idMensoleCerniere},
      //     {guide: idGuide},
      //     {motorizzato: idMotorizzato},
      //   ]}
      // });
      break;

    case 'api::configurazioni-ambito.configurazioni-ambito':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['id'],
        filters: { $and: [
          {ambito: data.ambito},
          {dimensione: data.dimensione},
          {tipologia: data.tipologia},
          {modello: data.modello},
        ]}
      });
      break;

    case 'api::configurazioni-disegno-esterno.configurazioni-disegno-esterno':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['id'],
        filters: { $and: [
          {modello: data.modello},
          {disegno_esterno: data.disegno_esterno},
          {finitura: data.finitura},
          {colore: data.colore},
        ]}
      });
      break;

    case 'api::configurazioni-oblo.configurazioni-oblo':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['id'],
        filters: { $and: [
          {modello: data.modello},
          {oblo: data.oblo},
          {cornice: data.cornice},
          {tamponamento_oblo: data.tamponamento_oblo},
        ]}
      });
      break;

    case 'api::configurazioni-sezione-vetrata.configurazioni-sezione-vetrata':
      existingRecords = await strapi.entityService.findMany(slug, {
        fields: ['id'],
        filters: { $and: [
          {modello: data.modello},
          {sezione_vetrata: data.sezione_vetrata},
          {tipo_sezione_vetrata: data.tipo_sezione_vetrata},
          {tipo_tamponamento_vetrata: data.tipo_tamponamento_vetrata},
          // {tamponamento_sezione_vetrata: data.tipo_tamponamento_vetrata},
        ]}
      });
      break;
  }

  console.log('existingRecords ->', existingRecords);
  console.log("----------");

  // Se il record non esiste, allora si procede con l'inserimento e l'aggiornamento delle relazioni
  if (existingRecords.length === 0) {
    const relationAttributes = getModelAttributes(slug, { filterType: ['component', 'dynamiczone', 'media', 'relation'] });

    // console.log('updateOrCreate ->', relationAttributes);
    // console.log("----------");

    for (let attribute of relationAttributes) {
      data[attribute.name] = await updateOrCreateRelation(user, attribute, data[attribute.name]);
    }

    let entry;
    const model = getModel(slug);
    if (model.kind === 'singleType') {
      entry = await updateOrCreateSingleType(user, slug, data, idField);
    } else {
      entry = await updateOrCreateCollectionType(user, slug, data, idField);
    }
    return entry;
  }
};

const updateOrCreateCollectionType = async (user, slug, data, idField) => {
  const whereBuilder = new ObjectBuilder();
  if (data[idField]) {
    whereBuilder.extend({ [idField]: data[idField] });
  }
  const where = whereBuilder.get();

  // Prevent strapi from throwing a unique constraint error on id field.
  if (idField !== 'id') {
    delete data.id;
  }

  let entry;
  if (!where[idField]) {
    entry = await strapi.db.query(slug).create({ data });
  } else {
    entry = await strapi.db.query(slug).update({ where, data });

    if (!entry) {
      entry = await strapi.db.query(slug).create({ data });
    }
  }

  return entry;
};

const updateOrCreateSingleType = async (user, slug, data, idField) => {
  delete data.id;

  let [entry] = await strapi.db.query(slug).findMany();
  if (!entry) {
    entry = await strapi.db.query(slug).create({ data });
  } else {
    entry = await strapi.db.query(slug).update({ where: { id: entry.id }, data });
  }

  return entry;
};

/**
 * Update or create a relation.
 * @param {Object} user
 * @param {Attribute} rel
 * @param {number | Object | Array<Object>} relData
 */
const updateOrCreateRelation = async (user, rel, relData) => {
  if (relData == null) {
    return null;
  }

  if (['createdBy', 'updatedBy'].includes(rel.name)) {
    return user.id;
  } else if (rel.type === 'dynamiczone') {
    const components = [];
    for (const componentDatum of relData || []) {
      let component = await updateOrCreate(user, componentDatum.__component, componentDatum);
      component = { ...component, __component: componentDatum.__component };
      components.push(component);
    }
    return components;
  } else if (rel.type === 'component') {
    relData = toArray(relData);
    relData = rel.repeatable ? relData : relData.slice(0, 1);
    const entryIds = [];
    for (const relDatum of relData) {
      if (typeof relDatum === 'number') {
        entryIds.push(relDatum);
      } else if (isObjectSafe(relDatum)) {
        const entry = await updateOrCreate(user, rel.component, relDatum);
        if (entry?.id) {
          entryIds.push(entry.id);
        }
      }
    }
    return rel.repeatable ? entryIds : entryIds?.[0] || null;
  } else if (rel.type === 'media') {
    relData = toArray(relData);
    relData = rel.multiple ? relData : relData.slice(0, 1);
    const entryIds = [];
    for (const relDatum of relData) {
      const media = await findOrImportFile(relDatum, user, { allowedFileTypes: rel.allowedTypes });
      if (media?.id) {
        entryIds.push(media.id);
      }
    }
    return rel.multiple ? entryIds : entryIds?.[0] || null;
  } else if (rel.type === 'relation') {
    const isMultiple = isArraySafe(relData);
    relData = toArray(relData);
    const entryIds = [];
    for (const relDatum of relData) {
      if (typeof relDatum === 'number') {
        entryIds.push(relDatum);
      } else if (isObjectSafe(relDatum)) {
        const entry = await updateOrCreate(user, rel.target, relDatum);
        if (entry?.id) {
          entryIds.push(entry.id);
        }
      }
    }
    return isMultiple ? entryIds : entryIds?.[0] || null;
  }

  throw new Error(`Could not update or create relation of type ${rel.type}.`);
};

module.exports = {
  importData,
};
