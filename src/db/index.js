import { writeFile, readFile } from 'fs/promises';

const DB_URL = './db.json';
const PATH_SEPARATOR = '.';

export const writeDataBase = async (path, data) => {
  const dataSrc = await readDataBase();
  return await writeFile(
    DB_URL,
    JSON.stringify({
      ...dataSrc,
      [path]: data,
    }),
    {
      encoding: 'utf-8',
    }
  );
};

export const readDataBase = async (path) => {
  const pathSplit = (path || '').split(PATH_SEPARATOR);
  const dataRaw = await readFile(DB_URL, {
    encoding: 'utf-8',
  });
  const dataJSON = JSON.parse(dataRaw);

  const result = pathSplit.reduce(
    (acc, pathItem) => (pathItem ? acc[pathItem] : acc),
    dataJSON
  );

  return result;
};

export default {
  writeDataBase,
  readDataBase,
};
