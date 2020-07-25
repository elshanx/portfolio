import React from 'react';
import { Button, Input } from 'components/common';
import { Center, InputField } from './styles';

export default () => (
  // <form name="contact" method="post" data-netlify="true">
  //   <input type="hidden" name="form-name" value="contact" />
  //   <InputField>
  //     <Input type="text" name="name" component="input" aria-label="name" placeholder="Full name*" />

  //   </InputField>
  //   <InputField>
  //     <Input id="email" aria-label="email" component="input" type="email" name="email" placeholder="Email*" />

  //   </InputField>
  //   <InputField>
  //     <Input aria-label="message" id="message" rows="8" type="textarea" name="message" placeholder="Message*" />

  //   </InputField>
  //   <Center>
  //     <Button secondary type="submit">
  //       Submit
  //     </Button>
  //   </Center>
  // </form>

  <form name="website-form" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
    <InputField>
      <input type="hidden" name="website-form" value="contact" />
      <Input type="text" name="name" component="input" aria-label="name" placeholder="Full name*" />
    </InputField>
    <InputField>
      <Input id="email" aria-label="email" component="input" type="email" name="email" placeholder="Email*" />
    </InputField>
    <InputField>
      <Input aria-label="message" id="message" rows="8" type="textarea" name="message" placeholder="Message*" />
    </InputField>
    <Center>
      <Button secondary type="submit">
        Submit
      </Button>
    </Center>
  </form>
);
