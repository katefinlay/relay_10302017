import { GraphQLObjectType } from 'graphql';
import { globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay';
import { nodeInterface } from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';

import { 
  Widget, 
  Viewer, 
  Car, 
  CarMake, 
  CarModel, 
  CarColor } from '../models/graphql-models';

import { WidgetData } from '../models/widget-data';
import { widgetConnectionType } from '../connections/widgets';

import { carConnectionType } from '../connections/cars';
import { CarData } from '../models/car-data';

import { carMakeConnectionType } from '../connections/car-makes';
import { CarMakeData } from '../models/car-make-data';

import { carModelConnectionType } from '../connections/car-models';
import { CarModelData } from '../models/car-model-data';

import { carColorConnectionType } from '../connections/car-colors';
import { CarColorData } from '../models/car-color-data';

export const viewerType = new GraphQLObjectType({

  name: 'Viewer',
  description: 'User of the application',
  fields: () => ({
    id: globalIdField('Viewer'),
    widgets: {
      type: widgetConnectionType,
      description: 'get all of the widgets',
      args: connectionArgs,
      resolve: (_, args, { baseUrl }) => {
        const widgetData = new WidgetData(baseUrl);
        return widgetData.all().then(widgets => {
          const widgetModels = widgets.map(w => Object.assign(new Widget(), w));
          const conn = connectionFromArray(widgetModels, args);
          conn.totalCount = widgetModels.length;
          return conn;
        });
      },
    },
    cars: {
      type: carConnectionType,
      description: 'get all of the cars',
      args: connectionArgs,
      resolve: (_, args, { baseUrl }) => {
        const carData = new CarData(baseUrl);
        return carData.all().then(cars => {
          const carModels = cars.map(c => Object.assign(new Car(), c));
          const conn = connectionFromArray(carModels, args);
          conn.totalCount = carModels.length;
          return conn;

        });
      },
    },
    carMakes: { 
      type: carMakeConnectionType,
      description: 'get all car makes',
      args: connectionArgs,
      resolve: (_, args, { baseUrl }) => {
        const carMakeData = new CarMakeData(baseUrl);
        return carMakeData.all().then(carMakes => {
          const carMakeModels = carMakes.map(cM => Object.assign(new CarMake(), cM));
          const conn = connectionFromArray(carMakeModels, args);
          conn.totalCount = carMakeModels.length;
          return conn;
        });
      },
    },
    carModels: { 
      type: carModelConnectionType,
      description: 'get all car makes',
      args: connectionArgs,
      resolve: (_, args, { baseUrl }) => {
        const carModelData = new CarModelData(baseUrl);
        return carModelData.all().then(carModels => {
          const carModelModels = carModels.map(cM => Object.assign(new CarModel(), cM));
          const conn = connectionFromArray(carModelModels, args);
          conn.totalCount = carModelModels.length;
          return conn;
        });
      },
    },
    carColors: { 
      type: carColorConnectionType,
      description: 'get all car makes',
      args: connectionArgs,
      resolve: (_, args, { baseUrl }) => {
        const carColorData = new CarColorData(baseUrl);
        return carColorData.all().then(carColors => {
          const carColorModels = carColors.map(cM => Object.assign(new CarColor(), cM));
          const conn = connectionFromArray(carColorModels, args);
          conn.totalCount = carColorModels.length;
          return conn;
        });
      },
    },
  }),

  interfaces: () => [ nodeInterface ],

});

registerType(Viewer, viewerType, id => {
  return Object.assign(new Viewer(), { id });
});