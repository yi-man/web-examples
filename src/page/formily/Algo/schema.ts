import { createSchemaField, ISchema } from '@formily/react'

export const schema: ISchema = {
  type: 'object',
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
}



export const schema1: ISchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: '用户名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    name: {
      type: 'void',
      title: '姓名',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        asterisk: true,
        feedbackLayout: 'none',
      },
      'x-component': 'FormGrid',
      properties: {
        firstName: {
          type: 'string',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '姓',
          },
        },
        lastName: {
          type: 'string',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '名',
          },
        },
      },
    },
    email: {
      type: 'string',
      title: '邮箱',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-validator': 'email',
    },
    gender: {
      type: 'string',
      title: '性别',
      enum: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        },
        {
          label: '第三性别',
          value: 3,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    birthday: {
      type: 'string',
      required: true,
      title: '生日',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
    },
    address: {
      type: 'string',
      required: true,
      title: '地址',
      'x-decorator': 'FormItem',
      'x-component': 'Cascader',
      'x-reactions': '{{fetchAddress}}',
    },
    idCard: {
      type: 'string',
      required: true,
      title: '身份证复印件',
      'x-decorator': 'FormItem',
      'x-component': 'IDUpload',
    },
    contacts: {
      type: 'array',
      required: true,
      title: '联系人信息',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayItems',
      items: {
        type: 'object',
        'x-component': 'ArrayItems.Item',
        properties: {
          sort: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.SortHandle',
          },
          popover: {
            type: 'void',
            title: '完善联系人信息',
            'x-decorator': 'Editable.Popover',
            'x-component': 'FormLayout',
            'x-component-props': {
              layout: 'vertical',
            },
            'x-reactions': [
              {
                fulfill: {
                  schema: {
                    title: '{{$self.query(".name").value() }}',
                  },
                },
              },
            ],
            properties: {
              name: {
                type: 'string',
                title: '姓名',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
              email: {
                type: 'string',
                title: '邮箱',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-validator': [{ required: true }, 'email'],
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
              phone: {
                type: 'string',
                title: '手机号',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-validator': [{ required: true }, 'phone'],
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
            },
          },
          remove: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.Remove',
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: '新增联系人',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
  },
}