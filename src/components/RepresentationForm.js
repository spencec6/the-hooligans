/** @jsx jsx */
import React from "react";
import { navigateTo } from 'gatsby-link'
import { jsx } from 'theme-ui'
import { Input, Label } from './Forms'
import Button from './Button'
import { randomize } from '../utils/helpers'

function encode(data) {
  const formData = new FormData();

  for (const key of Object.keys(data)) {
    formData.append(key, data[key]);
  }

  return formData;
}

export default class RepresentationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAttachment = e => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigateTo(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  render() {
    return (
      <form
        name="representation"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        action="/thank-you"
        sx={{ width: '100%'}}
      >
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="form-name" value="representation" onChange={this.handleChange} />
        <div sx={{ }}>
          <Label htmlFor="name" required>Your Name</Label>
          <Input
            name="name"
            type="text"
            onChange={this.handleChange}
            required
            sx={{ transform: `rotate(${randomize(-0.75,0.75)}deg)` }}
          />
        </div>
        <div sx={{ mt: 3 }}>
          <Label htmlFor="email" required>Your Email</Label>
          <Input
            name="email"
            type="email"
            onChange={this.handleChange}
            required
            sx={{ transform: `rotate(${randomize(-0.75,0.75)}deg)` }}
          />
        </div>
        <div sx={{ mt: 3 }}>
          <Label htmlFor="why">Why do you want to become a Hoolgain?</Label>
          <Input
            as="textarea"
            name="why"
            onChange={this.handleChange}
            rows="3"
            sx={{
              resize: 'vertical',
              transform: `rotate(${randomize(-0.75,0.75)}deg)`
            }}
          />
        </div>
        <div sx={{ mt: 3 }}>
          <Label required htmlFor="resume">Upload Your Resume</Label>
          <Input
            type="file"
            name="resume"
            onChange={this.handleAttachment}
            required
            sx={{
              transform: `rotate(${randomize(-0.75,0.75)}deg)`
            }}
          />
        </div>
        <Button type="submit" sx={{ variant: 'buttons.secondary', mt: 3}}>
          Get In Touch!
        </Button>
      </form>
    )
  }
}

export default RepresentationForm