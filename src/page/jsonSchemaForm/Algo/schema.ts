import { RJSFSchema, UiSchema } from "@rjsf/utils";

 const schema: RJSFSchema = {
  "title": "A algo form",
  "description": "A simple form example. Demonstrating ui options",
  "type": "object",
  "required": [
    "interaction_params",
  ],
  "properties": {
    interaction_params: {
      type: 'object',
      title: '交互参数',
      properties: {
        save_frequency: {
          type: 'number',
          title: '保存频率',
          default: -1,
          minimum: -1
        },
        echo_training_metrics: {
          type: 'boolean',
          title: '训练参数',
          default: true
        },
        write_training_prediction: {
          type: 'boolean',
          default: true
        },
        write_validation_prediction: {
          type: 'boolean',
          default: true
        }
      },
      required: ['save_frequency', 'echo_training_metrics']
    },
    train_params: {
      type: 'object',
      title: '训练参数',
      properties: {
        lossfunc: {
          type: 'string',
          oneOf: [
            {"const": 'BCEWithLogitsLoss', "title": "BCEWithLogitsLoss label"},        
          ]
        },
        num_trees: {
          type: 'integer',
          minimum: 1,
          default:30
        },
        learning_rate: {
          type: 'number',
          minimum: 0,
          default: 0.3
        },
        gamma: {
          type: 'number',
          default: 0
        },
        lambda_: {
          type: 'number',
          default: 1.0
        },
        max_depth: {
          type: 'integer',
          minimum: 1,
          default: 3
        },
        num_bins: {
          type: 'integer',
          minimum: 2,
          maximum: 65535,
          default: 16
        },
        min_split_gain: {
          type: 'number',
          minimum: 0,
          default: 0.0
        },
        min_sample_split: {
          type: 'integer',
          default: 20,
          minimum: 1
        },
        feature_importance_type: {
          type: 'string',
          oneOf: [
            {const: "gain", title: 'gain'}, {const: "split", title: 'split'}],
          default: 'gain'
        },
        /**
         * "max_num_cores": Integer(999).ge(1),
            "batch_size_val": Integer(40960).ge(1),
         */
        downsampling: {
          type: 'object',
          title: '下载样本',
          properties: {
            column: {
              type: 'object',
              title: '列',
              properties: {
                rate: {
                  type: 'number',
                  default: 1.0,
                  minimum: 0, 
                  maximum: 1
                }
              }
              
            },
            row: {
              type: 'object',
              title: '列',
              properties: {
                run_goss: {
                  type: 'boolean',
                  default: true,
                },
                // top_rate,
                // "other_rate": Float(0.4).gt(0).le(1).add_rule(lambda x, y: x + y["train_info"]["train_params"]["downsampling"]["row"]["top_rate"] <= 1, "top_rate + other_rate <=")
                other_rate: {
                  type: 'number',
                  minimum: 0,
                  maximum: 1,
                  format: 'expression'
                }
              }
              
            }
          }
          
        }
      }
    },
    /**
     * "category": {
          "cat_smooth": Float(1.0),
          "cat_features": {
              "col_index": String(""),
              "col_names": [Optional(RepeatableSomeOf(String("")))],
              "max_num_value": Integer(0).ge(0),
              "col_index_type": OneOf("inclusive", "exclusive").set_default_index(0),
              "col_names_type": OneOf("inclusive", "exclusive").set_default_index(0),
              "max_num_value_type": OneOf("intersection", "union").set_default_index(1)
          }
      },
     */
    // [Optional(RepeatableSomeOf(String("")))]  是什么
    metric: {
      type: 'object',
      properties: {
        decision_table: {
          type: 'object',
          properties: {
            method: {
              type: 'string',
              oneOf:[
                {
                  const: 'equal_frequency'
                }
              ]
            }
          }
        },
        acc: {
          type: 'string'
        },
      },
      required: ['acc']
    }
  }
};

const uiSchema: UiSchema = {
}

export default  {
  schema,
  uiSchema,
  // customValidate: function validate(data, errors) {
  //   console.log(222222222222222, errors)
  //   // if (!firstName) {
  //   //   errors.firstName.addError("should not empty");
  //   // }
  //   // if (!lastName) {
  //   //   errors.lastName.addError("should not empty");
  //   // }
  //   return errors;
  // }
}