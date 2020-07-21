import React, { useContext } from 'react';
// import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ThemeContext } from 'providers/ThemeProvider';
import { Header } from 'components/theme';
// eslint-disable-next-line no-unused-vars
import { Container, Button } from 'components/common'; // to do: link the button
import dev from 'assets/illustrations/dev.svg';
import { Wrapper, IntroWrapper, Details, Thumbnail } from './styles';

export const Intro = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper>
      <Header />
      <IntroWrapper as={Container}>
        <Details theme={theme}>
          <h1>Hi There!</h1>
          <h4>I’m Elshan and I’m a Front-end developer!</h4>
          {/* <Button as={AnchorLink} href="#contact">
            Hire me
          </Button> */}
          {/* to do: link the button */}
        </Details>
        <Thumbnail>
          <img src={dev} alt="I’m Elshan and I’m a Front-end developer!" />
        </Thumbnail>
      </IntroWrapper>
    </Wrapper>
  );
};
