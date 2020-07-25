// import React from 'react';
// import { Button, Input } from 'components/common';
// import { Error, Center, InputField } from './styles';

// const IndexPage = () => (
//   <form name="contact-form" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
//     <InputField>
//       <Input name="name" placeholder="Your Name" type="text" />
//     </InputField>
//     <InputField>
//       <Input name="email" placeholder="name@name.com" type="email" />
//     </InputField>
//     <InputField>
//       <Input aria-label="message" id="message" rows="15" type="textarea" name="message" placeholder="Message*" />
//     </InputField>
//     <Center>
//       <Button secondary type="submit">
//         Submit
//       </Button>
//     </Center>
//   </form>
// );

// export default IndexPage;

import React, { useState } from 'react';
import { navigate } from 'gatsby-link';
import { Button, Input } from 'components/common';
import { Center, InputField } from './styles';

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
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error));
  };

  return (
    <form
      name="contact"
      method="post"
      action="/thanks/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          Don’t fill this out: <input name="bot-field" onChange={handleChange} />
        </label>
      </p>
      <p>
        <label>
          Your name:
          <br />
          <input type="text" name="name" onChange={handleChange} />
        </label>
      </p>
      <p>
        <label>
          Your email:
          <br />
          <input type="email" name="email" onChange={handleChange} />
        </label>
      </p>
      <p>
        <label>
          Message:
          <br />
          <textarea name="message" onChange={handleChange} />
        </label>
      </p>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  );
};

export default ContactForm;
