import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

export class CarForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    make: '',
    model: '',
    year: 1900,
    color: '',
    price: 0,
  });

  onChange = e => {
    this.setState({
      [ e.target.name ]: e.target.type === 'number'
        ? Number(e.target.value)
        : e.target.value,
    });
  };

    onClick = () => {
      this.props.onSubmitCar({ ...this.state }).then(() => {
        this.props.onShowCarTable();
      });
    };

    render() {

    return <form>
      <div>
      <label htmlFor="select-make">Make</label>
        <select value="Make" id="select-make" onChange={this.onChange}>
          {this.props.viewer.carMakes.edges.map(
            ({ node: make }) => 
            <option value={make.value}>{make.value}</option>
          )}
        </select>
      </div>
      <div>
      <label htmlFor="select-model">Model</label>
        <select value="Model" id="select-model" onChange={this.onChange}>
          {this.props.viewer.carModels.edges.map(
            ({ node: model }) => 
            <option value={model.value}>{model.value}</option>
          )}
        </select>
      </div>
      <div>
        <label htmlFor="year-input">Year</label>
        <input type="number" id="year-input" name="year"
          value={this.state.year} onChange={this.onChange} />
      </div>
      <div>
      <label htmlFor="select-color">Color</label>
        <select value="Color" id="select-color" onChange={this.onChange}>
          {this.props.viewer.carColors.edges.map(
            ({ node: color }) => 
            <option value={color.value}>{color.value}</option>
          )}
        </select>
      </div>
      <div>
        <label htmlFor="price-input">Price</label>
        <input type="number" id="price-input" name="price"
          value={this.state.price} onChange={this.onChange} />
      </div>
      <button type="button" onClick={this.onClick}>Save Car</button>
    </form>;
  }
}

export const CarFormContainer = createFragmentContainer(CarForm, graphql`
fragment carForm_viewer on Viewer {
  carMakes(first: 10) @connection(key: "CarForm_carMakes") {
    edges {
      node {
        id
        value
      }
    }
  },
  carModels(first: 10) @connection(key: "CarForm_carModels") {
    edges {
      node {
        id
        value
      }
    }
  },
  carColors(first: 10) @connection(key: "CarForm_carColors") {
    edges {
      node {
        id
        value
      }
    }
  }
}
`);
