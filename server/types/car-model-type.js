import {
  GraphQLObjectType, GraphQLString,
  GraphQLInt, GraphQLFloat
} from 'graphql';
import { globalIdField } from 'graphql-relay';

import { nodeInterface } from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';

import { CarModel } from '../models/graphql-models';
import { CarModelData } from '../models/car-model-data';

export const carModelType = new GraphQLObjectType({

  name: 'CarModel',

  description: 'A single car model type',

  fields: () => ({
    id: globalIdField('CarModel'),
    value: { type: GraphQLString },
  }),

  interfaces: () => [ nodeInterface ],
});


const carModelData = new CarModelData('http://localhost:3010');
registerType(CarModel, carModelType, id => {
  return carModelData.one(id).then(carModel => Object.assign(new CarModel(), carModel));
});
