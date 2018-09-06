import React, { Component } from 'react';
import activityChart from '../../assets/activity-chart.png';
import styled from 'react-emotion';

const Container = styled('div')({
  margin: '2rem 0 8rem'
});

const Image = styled('img')({
  width: '100%'
});

export default class DeckInfo extends Component {
  render() {
    return (
      <Container>
        <Image src={activityChart} alt="activity chart" />
      </Container>
    );
  }
}
