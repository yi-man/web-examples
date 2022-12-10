import SchemaForm from './SchemaForm'
import { ISchema, Form } from '@formily/react'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import {Divider} from 'antd'
import { createForm } from '@formily/core'


interface FormGroupProps {
  schema: {[k: string]: ISchema}
}

class FormCache{
  cache: {[k:string]: Form}

  constructor() {
    this.cache = {}
  }
  
  setForm(k: string) {
    if(!this.cache[k]) {
      this.cache[k] = createForm({
        validateFirst: true,
      })
    }
  }

  getForm(k: string) {
    this.setForm(k)

    return this.cache[k]
  }
}

const formCache = new FormCache()

export const FormGroup: FC<FormGroupProps> = ({schema}) => {  

  return (
    <div>
      {
        Object.keys(schema).map(k => {
          const form = formCache.getForm(k)
          return (
            <div key={k}>
              <SchemaForm schema={schema[k]} form={form} />
              <Divider/> 
            </div>
          )
        })
      }
    </div>
  )
}