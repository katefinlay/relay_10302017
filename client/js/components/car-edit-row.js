import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

export class CarEditRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props);
  }

    onChange = e => {
      this.setState({
        [ e.target.name ]: e.target.type === 'number'
          ? Number(e.target.value)
          : e.target.value,
      });
    };

    restoreState = () => {

      this.setState({ ...this.props });
      this.props.onDone();
    };

    render() {
      return <tr>
        <td id="edit-row-make"><input type="text" id="make-input" name="make" value={this.state.make} onChange={this.onChange} /></td>
        <td><input type="text" id="model-input" name="model" value={this.state.model} onChange={this.onChange} /></td>
        <td><input type="number" id="year-input" name="year" value={this.state.year} onChange={this.onChange} /></td>
        <td><input type="text" id="color-input" name="color" value={this.state.color} onChange={this.onChange} /></td>
        <td><input type="number" id="price-input" name="price" value={this.state.price} onChange={this.onChange} /></td>
        <td>
          <button type="button" onClick={this.restoreState}>Cancel</button>
          {/*<button type="button" onClick={() => this.props.onUpdateCar(this.props.car.id)}>Save</button>*/}
        </td>
      </tr>;
    }
}

export const CarEditRowContainer = createFragmentContainer(CarEditRow, graphql`
  fragment carEditRow_car on Car {
    id
    make
    model
    year
    color
    price
  }
`);