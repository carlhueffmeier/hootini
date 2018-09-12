import React, { Component } from 'react';
import activityChart from '../../assets/activity-chart.png';
import styled from 'react-emotion';

const StyledDeckInfo = styled('div')({
  margin: '2rem 0 8rem'
});

const Image = styled('img')({
  width: '100%',
  maxWidth: '25rem',
  opacity: 0.5
});

export default class DeckInfo extends Component {
  render() {
    return (
      <StyledDeckInfo>
        <Image src={activityChart} alt="activity chart" />
      </StyledDeckInfo>
    );
  }
}
