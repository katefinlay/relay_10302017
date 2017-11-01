import { GraphQLInt } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';

import { carModelType } from '../types/car-model-type';

export const {
  connectionType: carModelConnectionType,
  edgeType: carModelEdgeType
} = connectionDefinitions({
  
  name: 'CarModels',
  nodeType: carModelType,

  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
    },
  }),
});