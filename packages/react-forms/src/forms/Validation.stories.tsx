import { useMemo, useEffect } from 'react'
import { action } from '@storybook/addon-actions'
import Form from './Form'
import InputField from '../fields/InputField'
import FormElement from './FormElement'
import useFormContext from './useFormContext'
import { object, string } from 'yup'
import ErrorMessageList from '../fields/ErrorMessageList'

export default {
  title: 'Forms/Validation',
  component: Form,
}

const ChangeWatcher = () => {
  const { state } = useFormContext()
  useEffect(() => {
    action('change')(state.get('value').toJS())
  }, [state.get('value')])
  return null
}

export const ValidationUsingYup = (): JSX.Element => {
  const initialValue = useMemo(
    () => ({
      email: '',
      password: '',
      contact: {
        firstName: '',
        lastName: '',
      },
    }),
    [],
  )

  const validationSchema = useMemo(
    () =>
      object().shape({
        email: string().required().email().max(64),
        password: string().required().min(8).max(64),
        contact: object()
          .required()
          .shape({
            firstName: string().required().min(5),
            lastName: string().required().min(5),
          }),
      }),
    [],
  )

  return (
    <div className="container mt-5 mb-5">
      <Form
        initialValue={initialValue}
        onSubmit={action('submit')}
        validationSchema={validationSchema}
      >
        <ChangeWatcher />
        <FormElement>
          <div className="form-group">
            <label>
              E-Mail Address:
              <InputField className="form-control" name="email" />
              <ErrorMessageList name="email" />
            </label>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label>
                First Name:
                <InputField className="form-control" name="contact.firstName" />
                <ErrorMessageList name="contact.firstName" />
              </label>
            </div>
            <div className="form-group col-md-6">
              <label>
                Last Name:
                <InputField className="form-control" name="contact.lastName" />
                <ErrorMessageList name="contact.lastName" />
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>
              Password:
              <InputField className="form-control" name="password" />
              <ErrorMessageList name="password" />
            </label>
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Sign up
            </button>
          </div>
        </FormElement>
      </Form>
    </div>
  )
}
