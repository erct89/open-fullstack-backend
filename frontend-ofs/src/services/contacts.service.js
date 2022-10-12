import axios from 'axios';
import {DB_BASE_URL, _getData} from './common.service';

const BASE_URL = `${DB_BASE_URL}/contacts`;

/**
 * [GET] /contacts
 * @returns {Array}
 */
export const getContacts = async () => {
  const response = await axios.get(`${BASE_URL}`);

  return _getData(response);
}

/**
 * [GET] /contacts/:id
 * @param {Object} contact
 * @returns {Object} contact
 */
export const getContact = async ({uid}) => {
  const response = await axios.get(`${BASE_URL}/${uid}`);

  return _getData(response);
}

/**
 * [POST] /contacts
 * @param {Object} contact 
 * @returns {Object} contact
 */
export const postContact = async (contact) => {
  const response = await axios.post(`${BASE_URL}`, contact);

  return _getData(response);
}

/**
 * [PUT] /contacts/:id
 * @param {Object} contact 
 * @returns {Object} contact
 */
export const putContact = async (contact) => {
  const {uid} = contact;
  const response = await axios.put(`${BASE_URL}/${uid}`, contact);

  return _getData(response);
}

/**
 * [DELETE] /contacts/:id
 * @param {Object} contact 
 * @returns {Object} contact
 */
export const deleteContact = async ({uid}) => {
  const response = await axios.delete(`${BASE_URL}/${uid}`);

  return _getData(response);
}
