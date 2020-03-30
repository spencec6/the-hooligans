/** @jsx jsx */
import { useState } from "react";
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

const RepresentationForm = () => {

  const [isSending, setIsSending] = useState(0);
  const [formState, setFormState] = useState({});

  const handleChange = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleAttachment = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.files[0]
    });
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    setIsSending(0)
    fetch("/", {
      method: "POST",
      body: encode({
        "form-name": form.getAttribute("name"),
        ...formState
      })
    })
      .then(() => setIsSending(0), navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  return (
    <form
      name="representation"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      action="/thank-you"
      onSubmit={(e) => handleSubmit(e)}
      sx={{ width: '100%'}}
    >
      <input type="hidden" name="bot-field" onChange={(e) => handleChange(e)}/>
      <input type="hidden" name="form-name" value="representation" />
      <div sx={{ }}>
        <Label htmlFor="name" required>Your Name</Label>
        <Input
          name="name"
          type="text"
          index={1}
          required
          onChange={(e) => handleChange(e)}
          sx={{ transform: `rotate(${-0.5}deg)` }}
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label htmlFor="email" required>Your Email</Label>
        <Input
          name="email"
          type="email"
          index={2}
          required
          onChange={(e) => handleChange(e)}
          sx={{ transform: `rotate(${0.7}deg)` }}
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label htmlFor="why">Why do you want to become a Hoolgain?</Label>
        <Input
          as="textarea"
          name="why"
          index={3}
          rows="3"
          onChange={(e) => handleChange(e)}
          sx={{
            resize: 'vertical',
            transform: `rotate(${-0.3}deg)`
          }}
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label required htmlFor="resume">
          Upload Your Resume
          <span sx={{ color: 'greys.600', fontSize: 0, fontWeight: 'book', letterSpacing: 0, pl: 1, textTransform: 'lowercase' }}>(.jpg, .jpeg, .png, .pdf)</span>
        </Label>
        <Input
          type="file"
          name="resume"
          index={4}
          required
          accept=".jpg,.png,.pdf,.jpeg"
          onChange={(e) => handleAttachment(e)}
          sx={{
            transform: `rotate(${0.4}deg)`
          }}
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label htmlFor="resume">
          Upload Your Reel
          <span sx={{ color: 'greys.600', fontSize: 0, fontWeight: 'book', letterSpacing: 0, pl: 1, textTransform: 'lowercase' }}>(.mp4, .mov, .mpeg)</span>
          </Label>
        <Input
          type="file"
          name="resume"
          index={5}
          accept=".mp4,.mov,.mpeg"
          onChange={(e) => handleAttachment(e)}
          sx={{
            transform: `rotate(${-0.6}deg)`
          }}
        />
      </div>
      <Button type="submit" sx={{ variant: 'buttons.secondary', mt: 3}}>
        {isSending ? (
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
          "Show Us Your Stuff"
        }
      </Button>
    </form>
  )
}

export default RepresentationForm