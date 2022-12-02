import { RJSFSchema, UiSchema } from "@rjsf/utils";


export const schema: RJSFSchema = {
  "title": "A registration form",
  "description": "A simple form example. Demonstrating ui options",
  "type": "object",
  "required": [
    "firstName",
    "lastName"
  ],
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First name",
      "default": "Chuck"
    },
    "lastName": {
      "type": "string",
      "title": "Last name"
    },
    "telephone": {
      "type": "string",
      "title": "Telephone",
      "minLength": 10
    }
  }
}

export const uiSchema: UiSchema = {
  "ui:submitButtonOptions": {
    "submitText": "Confirm Details",
    // "norender": false,
    "props": {
      "disabled": false,
      "className": "btn btn-info",
      type: 'primary'
    }
  },
  "firstName": {
    "ui:autofocus": true,
    "ui:emptyValue": "",
    "ui:autocomplete": "family-name"
  },
  "lastName": {
    "ui:title": "Surname",
    "ui:emptyValue": "",
    "ui:autocomplete": "given-name"
  },
  "age": {
    "ui:widget": "updown",
    "ui:title": "Age of person",
    "ui:description": "(earthian year)"
  },
  "bio": {
    "ui:widget": "textarea"
  },
  "password": {
    "ui:widget": "password",
    "ui:help": "Hint: Make it strong!"
  },
  "date": {
    "ui:widget": "alt-datetime"
  },
  "telephone": {
    "ui:options": {
      "inputType": "tel"
    }
  }
}

const schema0: RJSFSchema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: {
      type: "string", 
      title: "Title", 
      default: "A new task"
    },
    done: {
      type: "boolean", 
      title: "Done?", 
      default: false
    }
  }
};