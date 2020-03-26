/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Input, Label } from './Forms'
import Button from './Button'

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
          placeholder="Pete Townshend"
          type="text"
          required
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label htmlFor="email" required>Your Email</Label>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          required
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label htmlFor="website">Your Website</Label>
        <Input
          name="website"
          placeholder="Your Website"
          type="text"
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label htmlFor="message" required>Any other details you'd like to include:</Label>
        <Input
          as="textarea"
          name="message"
          rows="3"
          placeholder="Your Message"
          required
          sx={{
            resize: 'vertical',
          }}
        />
      </div>
      <Button sx={{ variant: 'buttons.secondary', mt: 3}}>
        Get In Touch!
      </Button>
    </form>
  )
}

export default ContactForm
