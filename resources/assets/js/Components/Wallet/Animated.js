import React, { Component } from 'react';
import './Animated.css';

export default class Animated extends Component {
  constructor(props){
    super(props);
    this.state = {
      containerClass: 'bg-white'
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.value > this.props.value ) {
      this.setState({containerClass: 'price-up animated'});
    } else if (nextProps.value < this.props.value) {
      this.setState({containerClass: 'price-down animated'})
    } else {
      this.setState({containerClass: ''})
    }
  }

  render() {
    return (
      <div className={this.state.containerClass}>
      { this.props.children }
      </div>
    )
  }

}
