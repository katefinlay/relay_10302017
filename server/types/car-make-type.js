import {
  GraphQLString, GraphQLObjectType
} from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';

import { CarMake } from '../models/graphql-models';
import { CarMakeData } from '../models/car-make-data';

export const carMakeType = new GraphQLObjectType({

  name: 'CarMake',

  description: 'A single car make type',

  fields: () => ({
    id: globalIdField('CarMake'),
    value: { type: GraphQLString },
  }),

  interfaces: () => [ nodeInterface ],
});


const carMakeData = new CarMakeData('http://localhost:3010');
registerType(CarMake, carMakeType, id => {
  return carMakeData.one(id).then(carMake => Object.assign(new CarMake(), carMake));
});
