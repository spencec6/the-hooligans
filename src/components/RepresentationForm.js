/** @jsx jsx */
import React from "react";
import { navigate } from "gatsby-link";
import { jsx } from 'theme-ui'
import RoundSmear from "-!svg-react-loader!../images/SVGs/round-smear-1.inline.svg";
import { FadeInOut } from './../components/Animations'
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
    this.state = {
      sending: false
    };
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
    this.setState({ sending: true })
    fetch("/", {
      method: "POST",
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => this.setState({ sending: false }), navigate(form.getAttribute("action")))
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
        onSubmit={this.handleSubmit}
        sx={{ width: '100%'}}
      >
        <input type="hidden" name="bot-field" onChange={this.handleChange}/>
        <input type="hidden" name="form-name" value="representation" />
        <div sx={{ }}>
          <Label htmlFor="name" required>Your Name</Label>
          <Input
            name="name"
            type="text"
            required
            onChange={this.handleChange}
            sx={{ transform: `rotate(${-0.5}deg)` }}
          />
        </div>
        <div sx={{ mt: 3 }}>
          <Label htmlFor="email" required>Your Email</Label>
          <Input
            name="email"
            type="email"
            required
            onChange={this.handleChange}
            sx={{ transform: `rotate(${0.7}deg)` }}
          />
        </div>
        <div sx={{ mt: 3 }}>
          <Label htmlFor="why">Why do you want to become a Hoolgain?</Label>
          <Input
            as="textarea"
            name="why"
            rows="3"
            onChange={this.handleChange}
            sx={{
              resize: 'vertical',
              transform: `rotate(${-0.3}deg)`
            }}
          />
        </div>
        <div sx={{ mt: 3 }}>
          <Label required htmlFor="resume">Upload Your Resume</Label>
          <Input
            type="file"
            name="resume"
            required
            accept=".jpg,.png,.pdf,.jpeg"
            onChange={this.handleAttachment}
            sx={{
              transform: `rotate(${0.4}deg)`
            }}
          />
        </div>
        <Button type="submit" sx={{ variant: 'buttons.secondary', mt: 3}}>
          {this.state.sending ? (
            <div sx={{
              alignItems: 'center',
              display: 'flex',
            }}>
              {Array.from({ length: 3}).map((_node, index) => {
                return (
                  <RoundSmear
                    key={`dot-${index}`}
                    className="about-bulletSmear"
                    sx={{
                      animation: `${FadeInOut} 1s ${index * 0.25}s infinite`,
                      color: 'primary',
                      height: '5px',
                      ml: index === 0 ? 0 : 3,
                      transform: `rotate(${randomize(0,360)}deg)`,
                      width: '5px',
                    }}
                  />
                )
              })}
              <div
                sx={{
                  color: 'primary',
                  pl: 3,
                }}
              >
                Sending
              </div>
            </div>
          ) : 
            "Get In Touch!"
          }
        </Button>
      </form>
    )
  }
}