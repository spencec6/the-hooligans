/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Input, Label } from './Forms'
import Button from './Button'

const ContactForm = () => {
  const submitForm = () => {
    console.log("form submitting")
  }

  return (
    <form sx={{ mb: [8,9], width: '100%'}}>
      <div sx={{ }}>
        <Label to="name">Your Name</Label>
        <Input
          name="name"
          placeholder="Your Name"
          type="text"
          autoFocus
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label to="email">Your Email</Label>
        <Input
          name="email"
          placeholder="Email"
          type="email"
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label to="website">Your Website</Label>
        <Input
          name="website"
          placeholder="Your Website"
          type="text"
        />
      </div>
      <div sx={{ mt: 3 }}>
        <Label to="message">Any other details you'd like to include:</Label>
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
      <Button onClick={(e) => console.log(e)} sx={{ variant: 'buttons.secondary', mt: 3}}>
        Get In Touch!
      </Button>
    </form>
  )
}

export default ContactForm
