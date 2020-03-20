/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Input, Label, Select } from './Forms'
import Button from './Button'

const VolunteerForm = () => {
  const submitForm = () => {
    console.log("form submitting")
  }

  return (
    <form sx={{ mb: [8,9], width: '100%'}}>
      <div>
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
        <Label to="skills">Your Skills</Label>
        <Select
          name="skills"
        >
          <option>Web Development</option>
          <option>Graphic Design</option>
          <option>Legal</option>
          <option>Copywriting</option>
          <option>Digital Marketing</option>
          <option>Other (please explain)</option>
        </Select>
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

export default VolunteerForm
