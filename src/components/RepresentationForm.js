/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Input, Label } from './Forms'
import Button from './Button'
import { randomize } from '../utils/helpers'

const RepresentationForm = () => {
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
      <input type="hidden" name="form-name" value="representation" />
      <div sx={{ }}>
        <Label htmlFor="name" required>Your Name</Label>
        <Input
          name="name"
          type="text"
          required
          sx={{ transform: `rotate(${randomize(-0.75,0.75)}deg)` }}
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label htmlFor="email" required>Your Email</Label>
        <Input
          name="email"
          type="email"
          required
          sx={{ transform: `rotate(${randomize(-0.75,0.75)}deg)` }}
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label htmlFor="why">Why do you want to become a Hoolgain?</Label>
        <Input
          as="textarea"
          name="why"
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

export default RepresentationForm