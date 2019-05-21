import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { updateFilters } from '../../Services/filters/actions';
import Checkbox from '../Checkbox';

import './style.scss';

const availableCats = ['Rice', 'Noodles', 'Dumpling', 'Set', 'Dessert', 'Drinks'];

class Filter extends Component {
  static propTypes = {
    updateFilters: PropTypes.func.isRequired,
    filters: PropTypes.array
  };

  componentDidMount() {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
    console.log(this.props)
    console.log(Array.from(this.selectedCheckboxes))

    this.props.updateFilters(Array.from(this.selectedCheckboxes));
  };

  createCheckbox = label => (
    <Checkbox
      classes="filters-available-size"
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />
  );

  createCheckboxes = () => availableCats.map(this.createCheckbox);

  render() {
    return (
      <div className="filters">
        <h4 className="title">Categories:</h4>
        {this.createCheckboxes()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters.items
});


export default connect(
  mapStateToProps,
  { updateFilters }
)(Filter);
