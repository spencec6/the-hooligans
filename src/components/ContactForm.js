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
      netilfy-honeypot="bot-field"
      encType="application/x-www-form-urlencoded"
      action="/thank-you"
      sx={{ mb: [8,9], width: '100%'}}
    >
      <p sx={{display: 'none'}}>
        <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
      </p>
      <div sx={{ }}>
        <Label htmlFor="name">Your Name</Label>
        <Input
          name="name"
          placeholder="Pete Townshend"
          type="text"
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label htmlFor="email">Your Email</Label>
        <Input
          name="email"
          placeholder="Email"
          type="email"
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
        <Label htmlFor="message">Any other details you'd like to include:</Label>
        <Input
          as="textarea"
          name="message"
          rows="3"
          placeholder="Your Message"
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
