import React, { Component } from 'react';
import styled from 'react-emotion';
import { navigate } from '@reach/router';
import { Button, TextButton } from '../components/styles/ButtonStyles';
import { BrandIcon } from '../components/Icons';
import subtlePattern from '../assets/doodles.png';

const Container = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100vh',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: `linear-gradient(#ffffff77, #ffffff77), url(${subtlePattern})`
}));

const Header = styled('div')(({ theme }) => ({
  ...theme.typography.h3,
  display: 'flex',
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
  color: theme.colors.brand,
  alignItems: 'baseline'
}));

const Title = styled('h1')(({ theme }) => ({
  ...theme.typography.h3,
  margin: 0,
  display: 'inline'
}));

const Tagline = styled('h2')(({ theme }) => ({
  ...theme.typography.h2,
  marginTop: '10vh',
  textAlign: 'center',
  color: theme.colors.textDark
}));

const CTA = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const CTAButton = styled(Button)(({ theme }) => ({
  fontSize: '1.3rem',
  position: 'relative',
  letterSpacing: '0.16rem',
  height: '4rem',
  padding: '0 2.5rem',
  boxShadow: 'none',
  borderRadius: '2rem',
  marginBottom: '0.8rem',
  background: theme.gradients.candy,
  '&:hover, &:focus': {
    boxShadow: 'none'
  }
}));

class Landing extends Component {
  render() {
    return (
      <Container>
        <Header>
          <BrandIcon />
          <Title>hootini</Title>
        </Header>
        <Tagline>Remember anything, forever.</Tagline>
        <CTA>
          <CTAButton onClick={() => navigate('/signup')} large>
            Get started for free
          </CTAButton>
          <TextButton onClick={() => navigate('/signin')} large>
            I already have an account
          </TextButton>
        </CTA>
      </Container>
    );
  }
}

export default Landing;
