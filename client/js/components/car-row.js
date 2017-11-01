import * as React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import { CarEditRowContainer } from './car-edit-row';
import { CarViewRowContainer } from './car-view-row';

export class CarRow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing : false
    };
  }

  onDone = () => {
    this.setState({ isEditing: false });
  }

  editCar = () => {
    this.setState({ isEditing: true });
  }
  
  renderViewRow() {
    return <CarViewRowContainer
      car={this.props.car} onDeleteCar={this.props.onDeleteCar}
      onEditCar={this.editCar} />;
  }

  renderEditRow() {
    return <CarEditRowContainer
      car={this.props.car} onDone={this.onDone} />;
  }
  
  render() {
    return this.state.isEditing ? this.renderEditRow() : this.renderViewRow()
  }
}

export const CarRowContainer = createFragmentContainer(CarRow, graphql`
  fragment carRow_car on Car {
    ...carViewRow_car
    ...carEditRow_car
  }
`);