import { ISchema } from '@formily/react'


const decorator = {
  default: {
    'x-decorator': 'FormItem'
  }
}

export const schema: {[k: string]: ISchema} = {
  dataset: {
    type: 'object',
    title: '选择数据集',
    'x-decorator': 'Section',
    properties: {
      ds: {
        type: 'string',
        title: '类型',
        enum: [
          { label: '类型1', value: 'type_1' },
          { label: '类型2', value: 'type_2' },
        ],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
      },
    },
  },
  xgb:  {
    type: 'object',
    title: '纵向xgb',
    'x-decorator': 'Section',
    properties: {
      interaction_params: {
        type: 'object',
        title: '交互参数',
        'x-decorator': 'FormLayout',
        'x-decorator-props': {
          bordered: true,
          style: {
            border: '1px solid red'
          }
        },
        properties: {
          save_frequency: {
            type: 'string',
            title: 'save_frequency',
            default: -1,
            exclusiveMinimum: -1,
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
          },
          echo_training_metrics: {
            type: 'boolean',
            title: 'echo_training_metrics',
            default: true,
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Checkbox',
          }
        }
      },
      train_params: {
        type: 'object',
        title: '训练参数',
        'x-decorator': 'FormLayout',
        'x-decorator-props': {
          labelCol: 6
        },
        properties: {
          lossfunc: {
            type: 'string',
            title: '函数',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              style: {
                // width: 120,
              },
            },
            enum: [
              { label: 'BCEWithLogitsLoss', value: 'BCEWithLogitsLoss' },
            ]
          },
          num_trees: {
            type: 'string',
            title: 'num_trees',
            default: 30,
            exclusiveMinimum: 1,
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              style: {
                width: 240,
              },
            },
          },
          downsampling: {
            type: 'object',
            title: '下载样本',
            'x-decorator': 'FormLayout',
           
            properties: {
              column: {
                type: 'object',
                title: '列',
                'x-decorator': 'FormLayout',
                'x-decorator-props': {
                  labelCol: 8
                },
                properties:{
                  rate: {
                    type: 'string',
                    title: 'rate',
                    default: 1.0,
                    exclusiveMinimum: 0,
                    exclusiveMaximum: 1,
                    'x-decorator': 'FormItem',
                    'x-component': 'NumberPicker',
                    'x-component-props': {
                      style: {
                        width: 240,
                      },
                      step: 0.1
                    },
                  },
                }
              },
              row: {
                type: 'object',
                title: '行',
                'x-decorator': 'FormLayout',
                'x-decorator-props': {
                  labelCol: 8
                },
                properties:{
                  run_goss: {
                    type: 'boolean',
                    title: 'run_goss',
                    default: true,
                    'x-decorator': 'FormItem',
                    'x-component': 'Checkbox',
                  },
  
                  top_rate: {
                    type: 'string',
                    title: 'top_rate',
                    default: 0.3,
                    exclusiveMinimum: 0,
                    exclusiveMaximum: 1,
                    'x-reactions': `{{(field) => {
                      field.selfErrors =
                        field.query('train_params.downsampling.row.other_rate').value() + field.value > 1  ? 'top_rate 和 other_rate的和小于1' : ''
                    }}}`,
                    'x-decorator': 'FormItem',
                    'x-component': 'NumberPicker',
                    'x-component-props': {
                      style: {
                        width: 240,
                      },
                      step: 0.1
                    },
                  },
  
                  other_rate: {
                    type: 'string',
                    title: 'other_rate',
                    default: 0.4,
                    exclusiveMinimum: 0,
                    exclusiveMaximum: 1,
                    'x-decorator': 'FormItem',
                    'x-component': 'NumberPicker',
                    'x-component-props': {
                      style: {
                        width: 240,
                      },
                      step: 0.1
                    },
                    'x-reactions': {
                      dependencies: ['train_params.downsampling.row.top_rate'],
                      fulfill: {
                        state: {
                          selfErrors: "{{$deps[0] + $self.value <= 1 ?  '' : 'top_rate 和 other_rate的和小于1'}}",
                        },
                      },
                    },
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  'data-cut': {
    type: 'object',
    title: '数据切割',
    'x-decorator': 'Section',
    properties: {
      username: {
        type: 'string',
        title: '用户名',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      password: {
        type: 'string',
        title: '密码',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Password',
      },
    },
  }
}