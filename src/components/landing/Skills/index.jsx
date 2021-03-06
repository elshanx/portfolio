import React, { useContext } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Button } from 'components/common';
import dev from 'assets/illustrations/skills.svg';
import { Wrapper, SkillsWrapper, Details, Thumbnail } from './styles';

export const Skills = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Wrapper id='about'>
      <SkillsWrapper as={Container}>
        <Thumbnail>
          <img src={dev} alt='I’m Elshan and I’m a Front-end developer' />
        </Thumbnail>
        <Details theme={theme}>
          <h1>More about me</h1>
          <p>
            I'm a front-end developer with a strong interest in projects that
            require both conceptual and analytical thinking, looking for a
            full-time job in order to enhance my skills and gain more experience
            and knowledge.
          </p>
          {
            <Button as={AnchorLink} href='#contact'>
              Contact Me
            </Button>
          }
        </Details>
      </SkillsWrapper>
    </Wrapper>
  );
};
