import { RJSFSchema, UiSchema } from "@rjsf/utils";




 const schema: RJSFSchema = {
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
      // "default": "Chuck"
    },
    "lastName": {
      "type": "string",
      "title": "Last name",
      // minLength: 1
      minLength: 3,
    },
    "telephone": {
      "type": "string",
      "title": "Telephone",
      "minLength": 10
    }
  }
}



 const uiSchema: UiSchema = {
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

export default  {
  schema,
  uiSchema,
  customValidate: function validate({ firstName, lastName }, errors) {
    // console.log(222222222222222, errors)
    // if (!firstName) {
    //   errors.firstName.addError("should not empty");
    // }
    // if (!lastName) {
    //   errors.lastName.addError("should not empty");
    // }
    return errors;
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