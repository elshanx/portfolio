import React, { useState } from 'react';
import { Button, Input } from 'components/common';
import { Error, Center, InputField } from './styles';

export default () => (
  <form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
    <input type="hidden" name="form-name" value="contact" />
    <InputField>
      <Input type="text" name="name" component="input" aria-label="name" placeholder="Full name*" />
      {/* <ErrorMessage component={Error} name="name" /> */}
    </InputField>
    <InputField>
      <Input id="email" aria-label="email" component="input" type="email" name="email" placeholder="Email*" />
      {/* <ErrorMessage component={Error} name="email" /> */}
    </InputField>
    <InputField>
      <Input aria-label="message" id="message" rows="8" type="textarea" name="message" placeholder="Message*" />
      {/* <ErrorMessage component={Error} name="message" /> */}
    </InputField>
    <Center>
      <Button secondary type="submit">
        Submit
      </Button>
    </Center>
  </form>
);
