import { ISchema } from '@formily/react'

export const schema: {[k: string]: ISchema} = {
  dataset: {
    type: 'object',
    title: '选择数据集',
    properties: {
      ds: {
        type: 'string',
        title: '类型',
        enum: [
          { label: '类型1', value: 'type_1' },
          { label: '类型2', value: 'type_2' },
        ],
        // 'x-decorator': 'FormItem',
        // 'x-component': 'Select',
      },
    },
  },
  xgb:  {
    type: 'object',
    title: '纵向xgb',
    properties: {
      interaction_params: {
        type: 'object',
        title: '交互参数',
        'x-decorator': 'Section',
        properties: {
          save_frequency: {
            type: 'number',
            title: 'save_frequency',
            default: -1,
            exclusiveMinimum: -1,
            required: true,
            // 'x-decorator': 'FormItem',
            // 'x-component': 'NumberPicker',
          },
          echo_training_metrics: {
            type: 'boolean',
            title: 'echo_training_metrics',
            default: true,
            required: true,
            // 'x-decorator': 'FormItem',
            // 'x-component': 'Checkbox',
          }
        }
      },
      train_params: {
        type: 'object',
        title: '训练参数',
        // 'x-decorator': 'Section',
        // 'x-decorator-props': {
        //   labelCol: 6
        // },
        properties: {
          lossfunc: {
            type: 'string',
            title: '函数',
            // 'x-decorator': 'FormItem',
            // 'x-component': 'Select',
            // 'x-component-props': {
            //   style: {
            //     // width: 120,
            //   },
            // },
            enum: [
              { label: 'BCEWithLogitsLoss', value: 'BCEWithLogitsLoss' },
            ]
          },
          num_trees: {
            type: 'string',
            title: 'num_trees',
            default: 30,
            exclusiveMinimum: 1,
            // 'x-decorator': 'FormItem',
            // 'x-component': 'NumberPicker',
            // 'x-component-props': {
            //   style: {
            //     width: 240,
            //   },
            // },
          },
          downsampling: {
            type: 'object',
            title: '下载样本',
            // 'x-decorator': 'Section',
           
            properties: {
              column: {
                type: 'object',
                title: '列',
                // 'x-decorator': 'Section',
                // 'x-decorator-props': {
                //   labelCol: 8
                // },
                properties:{
                  rate: {
                    type: 'number',
                    title: 'rate',
                    default: 1.0,
                    exclusiveMinimum: 0,
                    exclusiveMaximum: 1,
                    // 'x-decorator': 'FormItem',
                    // 'x-component': 'NumberPicker',
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
                // 'x-decorator': 'Section',
                // 'x-decorator-props': {
                //   labelCol: 8
                // },
                properties:{
                  run_goss: {
                    type: 'boolean',
                    title: 'run_goss',
                    default: true,
                    // 'x-decorator': 'FormItem',
                    // 'x-component': 'Checkbox',
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
                    // 'x-decorator': 'FormItem',
                    // 'x-component': 'NumberPicker',
                    'x-component-props': {
                      style: {
                        width: 240,
                      },
                      step: 0.1
                    },
                  },
  
                  other_rate: {
                    type: 'number',
                    title: 'other_rate',
                    default: 0.4,
                    exclusiveMinimum: 0,
                    exclusiveMaximum: 1,
                    // 'x-decorator': 'FormItem',
                    // 'x-component': 'NumberPicker',
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
    properties: {
      username: {
        type: 'string',
        title: '用户名',
        required: true,
        // 'x-decorator': 'FormItem',
        // 'x-component': 'Input',
      },
      password: {
        type: 'password',
        title: '密码',
        required: true,
        // 'x-decorator': 'FormItem',
        // 'x-component': 'Password',
      },
    },
  },
  xgboost_label: {
    "type": "object",
    "title": "xgboost",
    "properties": {
      "num_trees": {
        "type": "integer",
        "title": "num_trees",
        "exclusiveMinimum": 1
      },
      "learning_rate": {
        "type": "float",
        "title": "learning_rate",
        "minimum": 0,
        "maximum": 1
      },
      "gamma": {
        "type": "float",
        "title": "learning_rate",
        "exclusiveMinimum": 0
      },
      "lambda_": {
        "type": "float",
        "title": "lambda_",
        "exclusiveMinimum": 0
      },
      "max_depth": {
        "type": "integer",
        "title": "max_depth",
        "exclusiveMinimum": 1
      },
      "num_bins": {
        "type": "integer",
        "title": "max_depth",
        "exclusiveMinimum": 2
      },
      "min_split_gain": {
        "type": "float",
        "title": "min_split_gain",
        "exclusiveMinimum": 0
      },
      "min_sample_split": {
        "type": "integer",
        "title": "min_split_gain",
        "exclusiveMinimum": 1
      },
      "feature_importance_type": {
        "type": "string",
        "title": "feature_importance_type",
        "enum": [
          {
            "label": "gain",
            "value": "gain"
          },
          {
            "label": "split",
            "value": "split"
          }
        ]
      },
      "max_num_cores": {
        "type": "integer",
        "title": "max_num_cores",
        "exclusiveMinimum": 1
      },
      "batch_size_val": {
        "type": "integer",
        "title": "max_num_cores",
        "exclusiveMinimum": 1
      },
      "down_sampling": {
        "type": "object",
        "title": "Down sampling",
        "properties": {
          "column_rate": {
            "type": "integer",
            "title": "max_num_cores",
            "exclusiveMinimum": 0,
            "exclusiveMaximum": 1
          },
          "row_run_goss": {
            "type": "boolean",
            "title": "row_run_goss"
          },
          "row_top_rate": {
            "type": "float",
            "title": "row_top_rate",
            "minimum": 0,
            "maximum": 1
          },
          "row_other_rate": {
            "type": "float",
            "title": "row_other_rate",
            "minimum": 0,
            "maximum": 1
          }
        }
      },
      "categorical_feature": {
        "type": "object",
        "title": "Categorical Feature",
        "properties": {
          "category_smooth": {
            "type": "float",
            "title": "category_smooth",
            "minimum": 0,
            exclusiveMaximum: 1
          },
          "category_col_index": {
            "type": "string",
            "title": "category_col_index"
          },
          "category_col_names": {
            "type": "string",
            "title": "category_col_index"
          },
          "category_max_num_value": {
            "type": "integer",
            "title": "category_max_num_value",
            "exclusiveMinimum": 0
          },
          "catogory_col_index_type": {
            "type": "string",
            "title": "catogory_col_index_type",
            "enum": [
              {
                "label": "inclusive",
                "value": "inclusive"
              },
              {
                "label": "exclusive",
                "value": "exclusive"
              }
            ]
          },
          "category_col_names_type": {
            "type": "string",
            "title": "category_col_names_type",
            "enum": [
              {
                "label": "inclusive",
                "value": "inclusive"
              },
              {
                "label": "exclusive",
                "value": "exclusive"
              }
            ]
          },
          "category_max_num_value_type": {
            "type": "string",
            "title": "category_max_num_value_type",
            "enum": [
              {
                "label": "inclusive",
                "value": "inclusive"
              },
              {
                "label": "exclusive",
                "value": "exclusive"
              }
            ]
          }
        }
      },
      "metric": {
        "type": "object",
        "title": "Metric",
        "properties": {
          "decision_table": {
            "type": "boolean",
            "title": "decision_table"
          },
          "decision_table_method": {
            "type": "string",
            "title": "decision_table_method",
            "enum": [
              {
                "label": "equal_frequency",
                "value": "equal_frequency"
              },
              {
                "label": "equal_width",
                "value": "equal_width"
              }
            ]
          },
          "decision_table_bins": {
            "type": "integer",
            "title": "decision_table_bins",
            "exclusiveMinimum": 2
          }
        }
      },
      "early_stopping": {
        "type": "object",
        "title": "Early Stopping",
        "properties": {
          "early_stopping_key": {
            "type": "string",
            "title": "early_stopping_key",
            "enum": [
              {
                "label": "acc",
                "value": "precision"
              },
              {
                "label": "precision",
                "value": "equal_width"
              },
              {
                "label": "recall",
                "value": "equal_width"
              },
              {
                "label": "f1_score",
                "value": "equal_width"
              },
              {
                "label": "auc",
                "value": "equal_width"
              },
              {
                "label": "ks",
                "value": "equal_width"
              }
            ]
          },
          "early_stopping_patience": {
            "type": "integer",
            "title": "early_stopping_patience",
            "exclusiveMinimum": 1
          },
          "early_stopping_delta": {
            "type": "float",
            "title": "early_stopping_delta",
            "minimum": 0
          }
        }
      },
      "encryption_method": {
        "type": "string",
        "title": "Encryption",
        "enum": [
          {
            "label": "paillier",
            "value": "paillier"
          }
        ]
      }
    }
  },
  xgboost: {
    "type": "object",
    "title": "xgboost",
    "properties": {
      "max_num_cores": {
        "type": "integer",
        "title": "max_num_cores",
        "exclusiveMinimum": 1
      },
      "batch_size_val": {
        "type": "integer",
        "title": "max_num_cores",
        "exclusiveMinimum": 1
      },
      "down_sampling": {
        "type": "object",
        "title": "Down sampling",
        "properties": {
          "column_rate": {
            "type": "integer",
            "title": "max_num_cores",
            "exclusiveMinimum": 0,
            "exclusiveMaximum": 1
          }
        }
      },
      "categorical_feature": {
        "type": "object",
        "title": "Categorical Feature",
        "properties": {
          "category_col_index": {
            "type": "string",
            "title": "category_col_index"
          },
          "category_col_names": {
            "type": "string",
            "title": "category_col_index"
          },
          "category_max_num_value": {
            "type": "integer",
            "title": "category_max_num_value",
            "exclusiveMinimum": 0
          },
          "catogory_col_index_type": {
            "type": "string",
            "title": "catogory_col_index_type",
            "enum": [
              {
                "label": "inclusive",
                "value": "inclusive"
              },
              {
                "label": "exclusive",
                "value": "exclusive"
              }
            ]
          },
          "category_col_names_type": {
            "type": "string",
            "title": "category_col_names_type",
            "enum": [
              {
                "label": "inclusive",
                "value": "inclusive"
              },
              {
                "label": "exclusive",
                "value": "exclusive"
              }
            ]
          },
          "category_max_num_value_type": {
            "type": "string",
            "title": "category_max_num_value_type",
            "enum": [
              {
                "label": "inclusive",
                "value": "inclusive"
              },
              {
                "label": "exclusive",
                "value": "exclusive"
              }
            ]
          }
        }
      }
    }
  }
}