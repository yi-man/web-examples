import React, { useState, useEffect, forwardRef } from 'react'
import { createForm, Form as CoreForm } from '@formily/core'
import { createSchemaField, ISchema } from '@formily/react'
import {
  Form,
  FormItem,
  // FormLayout,
  FormCollapse,
  Input,
  Select,
  Cascader,
  DatePicker,
  Submit,
  FormGrid,
  Upload,
  ArrayItems,
  Editable,
  FormButtonGroup,
  NumberPicker,
  Checkbox,
  Password
} from '@formily/antd'
import { Card, Button, Spin, Typography } from 'antd'
import Section from './Section'

const {Title} = Typography

// const form = createForm({
//   validateFirst: true,
// })
const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormGrid,
    Section,
    Input,
    DatePicker,
    Cascader,
    Select,
    ArrayItems,
    Editable,
    NumberPicker,
    FormCollapse,
    Checkbox,
    Password
  }
})
interface Props{
  schema: ISchema,
  form: CoreForm
}
export default ({schema, form}: Props) => {
  const [loading, setLoading] = useState(false)

  console.log(333333333, schema, form)
  return (
    <div
      style={{
        paddingRight: 24,
      }}
    >
        <Spin spinning={loading} style={{ width: 620 }}>
          <Title level={5}>{schema.title}</Title>
          <Form
            form={form}
            labelCol={5}
            wrapperCol={16}
            onAutoSubmit={console.log}
            layout="vertical"
          >
            <SchemaField schema={schema} />
            {/* <FormButtonGroup.FormItem>
              <Submit block size="large">
                提交
              </Submit>
            </FormButtonGroup.FormItem> */}
          </Form>
        </Spin>
    </div>
  )
}