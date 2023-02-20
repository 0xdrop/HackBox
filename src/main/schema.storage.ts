import { Options } from 'electron-store';

type SchemaType = {
  foo: number;
  bar: string;
};

const schema: Options<SchemaType> = {};
export { schema, SchemaType };
