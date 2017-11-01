import {
  GraphQLString, GraphQLObjectType
} from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';

import { CarColor } from '../models/graphql-models';
import { CarColorData } from '../models/car-color-data';

export const carColorType = new GraphQLObjectType({

  name: 'CarColor',

  description: 'A single car color type',

  fields: () => ({
    id: globalIdField('CarColor'),
    value: { type: GraphQLString },
  }),

  interfaces: () => [ nodeInterface ],
});


const carColorData = new CarColorData('http://localhost:3010');
registerType(CarColor, carColorType, id => {
  return carColorData.one(id).then(carColor => Object.assign(new CarColor(), carColor));
});
