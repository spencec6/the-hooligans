/** @jsx jsx */
import { graphql, useStaticQuery } from 'gatsby'
import { jsx } from 'theme-ui'
import { Input, Label } from './Forms'
import Button from './Button'
import { randomize } from '../utils/helpers'

const ContactForm = () => {
  const data = useStaticQuery(graphql`
    {
      form: contentfulContactForm {
        slug
        submitButton
        inputs {
          slug
          label
          isRequired
          inputType
        }
      }
    }  
  `)
  const form = data.form
  return (
    <form
      name={`${form.slug}`}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      action="/thank-you"
      sx={{ width: '100%'}}
    >
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="contact" />
      {form.inputs.map((input, index) => {
        return (
          <div key={input.slug} sx={{ mt: index === 0 ? 0 : 3 }}>
            <Label htmlFor={input.slug} required={input.isRequired}>{input.label}</Label>
            <Input
              as={input.inputType === 'textarea' ? 'textarea' : 'input'}
              index={index}
              name={input.slug}
              required={input.isRequired}
              row={input.inputType === 'textarea' ? 3 : null}
              type={input.inputType}
              sx={{ 
                resize: input.inputType === 'textarea' ? 'vertical' : null,
                transform: `rotate(${randomize(-0.75,0.75)}deg)`
              }}
            />
          </div>
        )
      })}
      <Button type="submit" sx={{ variant: 'buttons.secondary', mt: 4}}>
        {form.submitButton}
      </Button>
    </form>
  )
}

export default ContactForm
