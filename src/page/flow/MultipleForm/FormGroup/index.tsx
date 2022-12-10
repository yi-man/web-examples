import SchemaForm from './SchemaForm'
import { ISchema  } from '@formily/react'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import {Button, Divider} from 'antd'
import {FormGroupCache} from './FormCache'

interface FormGroupProps {
  name: string;
  schema: {[k: string]: ISchema}
}


const formGroupCache = new FormGroupCache()

export const FormGroup: FC<FormGroupProps> = ({name, schema}) => {
  const formCache = useMemo(() => {
    return formGroupCache.getFormCache(name)
  }, [name])


  useEffect(() => {
    formCache.removeExpiredForm(Object.keys(schema))
  }, [Object.keys(schema)])

  const onSubmit = () => {
    formCache.submit().then((d)=> {console.log(d)})
  }

  return (
    <div id={`${name}`}>
      {
        Object.keys(schema).map(k => {
          const form = formCache.getForm(k)
          return (
            <div key={k} id={`${name}-${k}`}>
              <SchemaForm schema={schema[k]} form={form} />
              <Divider/> 
            </div>
          )
        })
      }
      <Button type='primary' onClick={onSubmit}>提交</Button>
    </div>
  )
}