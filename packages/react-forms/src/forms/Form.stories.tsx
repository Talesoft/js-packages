import { useMemo, useEffect } from 'react'
import { action } from '@storybook/addon-actions'
import Form from './Form'
import InputField from '../fields/InputField'
import SelectField from '../fields/SelectField'
import TextAreaField from '../fields/TextAreaField'
import SpanField from '../fields/SpanField'
import FormElement from './FormElement'
import useFormContext from './useFormContext'

export default {
  title: 'Forms/Creating Forms',
  component: Form,
}

const ChangeWatcher = () => {
  const { state } = useFormContext()
  useEffect(() => {
    action('change')(state.get('value').toJS())
  }, [state.get('value')])
  return null
}

export const Basic = (): JSX.Element => {
  const initialValue = useMemo(
    () => ({
      email: 'someone@example.com',
      password: '12345',
    }),
    [],
  )

  return (
    <div className="container mt-5 mb-5">
      <Form initialValue={initialValue} onSubmit={action('submit')}>
        <ChangeWatcher />
        <FormElement>
          <div className="form-group">
            <label>
              E-Mail:
              <InputField name="email" className="form-control" />
            </label>
          </div>
          <div className="form-group">
            <label>
              Password:
              <InputField name="password" type="password" className="form-control" />
            </label>
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </FormElement>
      </Form>
    </div>
  )
}

export const AllInbuiltInputs = (): JSX.Element => {
  const initialValue = useMemo(
    () => ({
      exampleText: 'Example Text',
      exampleOption: 'option-three',
      exampleMultiOption: ['option-three', 'option-five'],
      exampleChecked: true,
      exampleRadioValue: 'c',
      exampleTime: 6000,
      exampleDate: Math.floor(Date.now() / 1000),
      exampleDateTime: Math.floor(Date.now() / 1000),
      exampleTextArea: 'Some content',
    }),
    [],
  )

  return (
    <div className="container mt-5 mb-5">
      <Form initialValue={initialValue} onSubmit={action('submit')}>
        <ChangeWatcher />
        <FormElement>
          <div className="form-group">
            <label>
              Text Input:
              <InputField name="exampleText" className="form-control" />
            </label>
          </div>
          <div className="form-group">
            <label>
              Select:
              <SelectField name="exampleOption" className="form-control">
                <option value="option-one">Option One</option>
                <option value="option-twp">Option Two</option>
                <option value="option-three">Option Three</option>
              </SelectField>
            </label>
          </div>
          <div className="form-group">
            <label>
              Multi Select:
              <SelectField name="exampleMultiOption" multiple className="form-control">
                <option value="option-one">Option One</option>
                <option value="option-twp">Option Two</option>
                <option value="option-three">Option Three</option>
                <option value="option-four">Option Four</option>
                <option value="option-five">Option Five</option>
              </SelectField>
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <InputField name="exampleChecked" type="checkbox" className="form-check-input" />{' '}
              Check this or don't
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <InputField
                name="exampleRadioValue"
                type="radio"
                value="a"
                className="form-check-input"
              />
              A
            </label>{' '}
            <label className="form-check-label">
              <InputField
                name="exampleRadioValue"
                type="radio"
                value="b"
                className="form-check-input"
              />{' '}
              B
            </label>{' '}
            <label className="form-check-label">
              <InputField
                name="exampleRadioValue"
                type="radio"
                value="c"
                className="form-check-input"
              />{' '}
              C
            </label>
          </div>
          <div className="form-group">
            <label>
              Time:
              <InputField name="exampleTime" type="time" className="form-control" />
            </label>
          </div>
          <div className="form-group">
            <label>
              Date:
              <InputField name="exampleDate" type="date" className="form-control" />
            </label>
          </div>
          <div className="form-group">
            <label>
              Datetime Local:
              <InputField name="exampleDateTime" type="datetime-local" className="form-control" />
            </label>
          </div>
          <div className="form-group">
            <label>
              Text area:
              <TextAreaField name="exampleTextArea" rows={6} className="form-control" />
            </label>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </FormElement>
      </Form>
    </div>
  )
}

export const NestedValues = (): JSX.Element => {
  const initialValue = useMemo(
    () => ({
      firstName: 'Bob',
      lastName: 'Kelsoe',
      snack: 'Muffin',
      age: 38,
      contactInfos: {
        linkedIn: 'https://linkedin.com/BobKelsoe',
        twitter: 'https://twitter.com/BobKelsoe',
        github: 'https://github.com/BobKelsoe',
      },
    }),
    [],
  )

  return (
    <div className="container mt-5 mb-5">
      <Form initialValue={initialValue} onSubmit={action('submit')}>
        <ChangeWatcher />
        <FormElement>
          <div className="form-group">
            <label>
              First Name:
              <InputField name="firstName" className="form-control" />
            </label>
          </div>
          <div className="form-group">
            <label>
              Last Name:
              <InputField name="lastName" className="form-control" />
            </label>
          </div>
          <div className="form-group">
            <label>
              Age:
              <InputField name="age" className="form-control" />
            </label>
          </div>
          <div className="form-group">
            <label>
              Snack: <SpanField name="snack" />
            </label>
          </div>
          <fieldset>
            <legend>Contact Info</legend>
            <div className="form-group">
              <label>
                LinkedIn:
                <InputField name="contactInfos.linkedIn" className="form-control" />
              </label>
            </div>
            <div className="form-group">
              <label>
                Twitter:
                <InputField name="contactInfos.twitter" className="form-control" />
              </label>
            </div>
            <div className="form-group">
              <label>
                GitHub:
                <InputField name="contactInfos.github" className="form-control" />
              </label>
            </div>
          </fieldset>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </FormElement>
      </Form>
    </div>
  )
}

export const NestedArrayPath = (): JSX.Element => {
  const initialValue = useMemo(
    () => ({
      firstName: 'Bob',
      lastName: 'Kelsoe',
      snack: 'Muffin',
      age: 38,
      skills: [
        { description: 'Eating muffins' },
        { description: 'Being awesome' },
        { description: 'Eating more muffins' },
      ],
    }),
    [],
  )

  return (
    <div className="container mt-5 mb-5">
      <Form initialValue={initialValue} onSubmit={action('submit')}>
        <ChangeWatcher />
        <FormElement>
          <div className="form-group">
            <label>
              First Name:
              <InputField name="firstName" className="form-control" />
            </label>
          </div>
          <div className="form-group">
            <label>
              Last Name:
              <InputField name="lastName" className="form-control" />
            </label>
          </div>
          <div className="form-group">
            <label>
              Age:
              <InputField name="age" className="form-control" />
            </label>
          </div>
          <div className="form-group">
            <label>
              Snack: <SpanField name="snack" />
            </label>
          </div>
          <fieldset>
            <legend>Contact Info</legend>
            <div className="form-group">
              <label>
                LinkedIn:
                <InputField name="skills.0.description" className="form-control" />
              </label>
            </div>
            <div className="form-group">
              <label>
                Twitter:
                <InputField name="skills.1.description" className="form-control" />
              </label>
            </div>
            <div className="form-group">
              <label>
                GitHub:
                <InputField name="skills.2.description" className="form-control" />
              </label>
            </div>
          </fieldset>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </FormElement>
      </Form>
    </div>
  )
}
