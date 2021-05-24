import { useMemo, useEffect, Fragment } from 'react'
import { action } from '@storybook/addon-actions'
import Form from '../forms/Form'
import InputField from './InputField'
import FieldArray from './FieldArray'
import FormElement from '../forms/FormElement'
import useFormContext from '../forms/useFormContext'

export default {
  title: 'Fields/Arrays',
  component: FieldArray,
}

const ChangeWatcher = () => {
  const { state } = useFormContext()
  useEffect(() => {
    action('change')(state.get('value').toJS())
  }, [state.get('value')])
  return null
}

export const BasicArrayExample = (): JSX.Element => {
  const initialValue = useMemo(
    () => ({
      items: [
        { title: 'Buy eggs', finished: true },
        { title: 'Buy milk', finished: false },
        { title: 'Wash car', finished: false },
      ],
    }),
    [],
  )
  return (
    <div className="container mt-5 mb-5">
      <Form initialValue={initialValue} onSubmit={action('submit')}>
        <ChangeWatcher />
        <FormElement>
          <FieldArray name="items">
            {({ map, push, unshift }) => (
              <>
                <button type="button" onClick={() => unshift({ title: '', finished: false })}>
                  Prepend item
                </button>
                {map(({ key, childName, remove }) => (
                  <Fragment key={key}>
                    <div className="row">
                      <div className="form-group form-group-inline">
                        <label>
                          Task:
                          <InputField className="form-control" name={childName('title')} />
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <label className="form-check-label">
                          <InputField
                            className="form-check-input"
                            type="checkbox"
                            name={childName('finished')}
                          />{' '}
                          Finished
                        </label>
                      </div>
                      <div className="form-group form-group-inline">
                        <button onClick={remove}>X</button>
                      </div>
                    </div>
                  </Fragment>
                ))}
                <button type="button" onClick={() => push({ title: '', finished: false })}>
                  Append item
                </button>
              </>
            )}
          </FieldArray>
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

export const StressTest = (): JSX.Element => {
  const initialValue = useMemo(
    () => ({
      items: Array.from({ length: 50 }, (_, i) => ({ title: `Item ${i}`, finished: true })),
    }),
    [],
  )
  return (
    <div className="container mt-5 mb-5">
      <Form initialValue={initialValue} onSubmit={action('submit')}>
        <FormElement>
          <FieldArray name="items">
            {({ map, push, unshift }) => (
              <>
                <button
                  onClick={() =>
                    unshift(...Array.from({ length: 50 }, () => ({ title: '', finished: false })))
                  }
                  type="button"
                >
                  Prepend 50 items
                </button>
                {map(({ key, childName, remove }) => (
                  <Fragment key={key}>
                    <div className="row">
                      <div className="form-group form-group-inline">
                        <label>
                          Task:
                          <InputField className="form-control" name={childName('title')} />
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <label className="form-check-label">
                          <InputField
                            className="form-check-input"
                            type="checkbox"
                            name={childName('finished')}
                          />{' '}
                          Finished
                        </label>
                      </div>
                      <div className="form-group form-group-inline">
                        <button onClick={remove}>X</button>
                      </div>
                    </div>
                  </Fragment>
                ))}
                <button
                  onClick={() =>
                    push(...Array.from({ length: 50 }, () => ({ title: '', finished: false })))
                  }
                  type="button"
                >
                  Append 50 items
                </button>
              </>
            )}
          </FieldArray>
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
