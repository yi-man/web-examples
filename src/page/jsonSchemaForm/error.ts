export default {
  schema: {
    title: "Contextualized errors",
    type: "object",
    "required": [
      "firstName",
      'name'
    ],
    properties: {
      location:{
        "title": "Location",
        "type": "object",
        "anyOf": [
          {
            "title": "City",
            "properties": {
              "city": {
                "type": "string"
              }
            },
            "required": [
              "city"
            ]
          },
          {
            "title": "Coordinates",
            "properties": {
              "lat": {
                "type": "number"
              },
              "lon": {
                "type": "number"
              }
            },
            "required": [
              "lat",
              "lon"
            ]
          }
        ]
      },
      all: {
        title: "Field",
        allOf: [
          {
            type: ["string", "boolean"]
          },
          {
            type: "boolean"
          },
        ],
      },
      child: {
        type: "object",
        anyOf: [
          {
            properties: {
              lorem: {
                type: "string",
              },
            },
            required: ["lorem"],
          },
          {
            properties: {
              lorem: {
                type: "string",
              },
              ipsum: {
                type: "string",
              },
            }
          },
        ],
      },
      firstName: {
        type: "string",
        title: "First name",
        minLength: 8,
      },
      active: {
        type: "boolean",
        title: "Active",
      },
      skills: {
        type: "array",
        items: {
          type: "string",
          minLength: 5,
        },
      },
      multipleChoicesList: {
        type: "array",
        title: "Pick max two items",
        uniqueItems: true,
        maxItems: 2,
        items: {
          type: "string",
          enum: ["foo", "bar", "fuzz"],
        },
      },
      inlineCheckBoxes: {
        type: "array",
        minItems: 2,
        title: "A multiple-choice list",
        items: {
          type: "string",
          enum: ["foo", "bar", "fuzz", "qux"],
        },
        uniqueItems: true
      },
      "name": { "type": "string" },
      "credit_card": { "type": "number" },
      "billing_address": { "type": "string" }
    },
    "dependencies": {
      "credit_card": {
        "properties": {
          "billing_address": { "type": "string" }
        },
        "required": ["billing_address"]
      }
    }
  },
  uiSchema: {
    child: {
      "ui:title": '孩子啊',
      lorem: {
        "ui:title": 'lorem孩子啊',
      }
    },
    firstName: {
      "ui:options": {
        inline: true
      },
      // props: {
      //   wrapperCol: 8
      // }
    },
    skills: {
      "ui:options":  {
        orderable: false,
        addable: false,
        removable: false
      },
    },
    inlineCheckBoxes:{
      "ui:widget": "checkboxes",
      "ui:options": {
        inline: true
      }
    }
  },
  formData: {
    firstName: "Chuck",
    active: "wrong",
    skills: ["karate", "budo", "aikido"],
    multipleChoicesList: ["foo", "bar", "fuzz"],
  },
};
