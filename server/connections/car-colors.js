import { GraphQLInt } from 'graphql';
import { connectionDefinitions } from 'graphql-relay';

import { carColorType } from '../types/car-color-type';

export const {
  connectionType: carColorConnectionType,
  edgeType: carColorEdgeType
} = connectionDefinitions({
  
  name: 'CarColors',
  nodeType: carColorType,

  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
    },
  }),

});