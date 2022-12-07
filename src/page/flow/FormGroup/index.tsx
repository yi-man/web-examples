import {Form} from 'antd'
import Form1 from '../../formily'
import Form2 from '../../formily/Algo'


export const FormGroup = () => {
  return (
    <Form.Provider
      onFormFinish={name => {
        if (name === 'form1') {
          // Do something...
        }
      }}
    >
      <Form1/>
      <Form2/>
    </Form.Provider>
  )
}