/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Input, Label } from './Forms'
import Button from './Button'
import { randomize } from '../utils/helpers'

const ContactForm = () => {
  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      action="/thank-you"
      sx={{ width: '100%'}}
    >
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="contact" />
      <div sx={{ }}>
        <Label htmlFor="name" required>Your Name</Label>
        <Input
          name="name"
          type="text"
          index={1}
          required
          sx={{ transform: `rotate(${randomize(-0.75,0.75)}deg)` }}
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label htmlFor="email" required>Your Email</Label>
        <Input
          name="email"
          type="email"
          index={2}
          required
          sx={{ transform: `rotate(${randomize(-0.75,0.75)}deg)` }}
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label htmlFor="website">Your Website</Label>
        <Input
          name="website"
          type="text"
          index={3}
          sx={{ transform: `rotate(${randomize(-0.75,0.75)}deg)` }}
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label htmlFor="obstacles">What is your biggest challenge or obstacle?</Label>
        <Input
          as="textarea"
          name="obstacles"
          index={4}
          rows="3"
          sx={{
            resize: 'vertical',
            transform: `rotate(${randomize(-0.75,0.75)}deg)`
          }}
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label htmlFor="methods">What methods have you already tried to solve the problem?</Label>
        <Input
          as="textarea"
          name="methods"
          index={5}
          rows="3"
          sx={{
            resize: 'vertical',
            transform: `rotate(${randomize(-0.75,0.75)}deg)`
          }}
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label htmlFor="missing">What’s been missing in your past experiences working with creative teams?</Label>
        <Input
          as="textarea"
          name="missing"
          index={6}
          rows="3"
          sx={{
            resize: 'vertical',
            transform: `rotate(${randomize(-0.75,0.75)}deg)`
          }}
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label htmlFor="message">Any other details you'd like to include:</Label>
        <Input
          as="textarea"
          name="message"
          index={7}
          rows="3"
          sx={{
            resize: 'vertical',
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

export default ContactForm
