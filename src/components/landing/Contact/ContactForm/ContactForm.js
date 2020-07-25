import React, { useState } from 'react';
import { navigate } from 'gatsby-link';
import { Button, Input, TextInput } from 'components/common';
import { Center, InputField } from './styles';

// Todos: validate inputs

console.log(`%c
    I see that you've found my 'secret' message. 
    and also, I know the forms aren't validated. I'll fix it later. (maybe)
`, 'color: #bada55')

// Add /thanks/ page

function encode(data) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

const ContactForm = () => {
  const [state, setState] = useState({});

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => {
        navigate(form.getAttribute('action'))
        alert('Your message has been successfully sent, I will get back to you ASAP.')
      })
      .catch(error => alert(error));
  };

  return (
    <form
      name="contact"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <input name="bot-field" onChange={handleChange} />
      </p>
      <InputField>
        <Input
          type="text"
          name="name"
          onChange={handleChange}
          component="input"
          aria-label="name"
          placeholder="Full name*"
        />
      </InputField>
      <InputField>
        <Input
          placeholder="Email*"
          type="email"
          name="email"
          onChange={handleChange}
          id="email"
          aria-label="email"
          component="input"
        />
      </InputField>
      <InputField>
        <TextInput
          rows="8"
          aria-label="message"
          id="message"
          type="email"
          name="message"
          placeholder="Message*"
          onChange={handleChange}
        />
      </InputField>
      <Center>
        <Button secondary type="submit">
          Submit
        </Button>
      </Center>
    </form>
  );
};

export default ContactForm;
