## About
This library help to validate your input field and show errors list.
## Installation
For installation use npm:
 `npm install git+ssh://git@github.com/maxiadlovskii/react-input-validator.git --save`
## Usage
### Input field
For using `Input` with validation just import it from  `react-input-validator`and add validations rules as a props
 
    import { Input } from 'react-input-validator'
    const rules = [{
        required: true,
        message: 'This field is required'
    }]
    export const MyInput = props => <Input trigger={'onChange'} rules={rules}/>;
    

This code validate input when `onChange` trigger appear 

    trigger 'onChange' | 'onBlur'
### Rules
`rules` is `object[]`Includes validation rules.<br/> 
Each rule could has next keys:<br/> 
`message` - `string|ReactNode` validation error message. When not specified, a default value appears.<br/> 
`required` - `Boolean` means is field required<br/> 
 `regExp` - `string`   validate from a regular expression<br/> 
`min` - `number` validate a min value of a field<br/> 
`max`- `number` validate a max value of a field<br/> 
`validator` - `function(value) => Boolean` custom validate function which should return `true` when value pass<br/> 
f.e.

    const rules = [  
	        {required: true, message: 'This field is required'},  
		      {max: 70},  
	        {min: 20},  
	        {regExp: '^(0|[1-9]\\d*)([.,]\\d+)?',message: 'Field should be a number'},  
	        {validator: value => Number(value) === 30,message: 'Value should be 30'}  
        ];
### Styling
Its possible to add styles using css modules 

    import { Input as CustomInput } from 'react-input-validator'  
    import styles from './Input.module.scss'  
      
    export const Input = props => <CustomInput cssModule={styles} {...props}/>;
  In  `Input.module.scss` You should use next class names:<br/> 
  `.errors` - error container<br/> 
  `.error` - error item<br/> 
  `.input` - input field<br/> 
f.e.

    .errors {  
      list-style: none;  
      font-size: 15px;  
      color: red;  
    }
You could also use props `inputClassName, errorsClassName, errorClassName` for adding some special styles or use direct styles `'.my-validated-input',  '.my-validated-input__errors',  '.my-validated-input__error'`

### All Input props
`rules`  `object[]` validation rules ,<br/>     
`trigger` `'onChange' | 'onBlur'`,<br/>   
`onErrors` `function(errors)` - callback runs then field has errors,<br/>   
`cssModule`  `object` - imported file with styles,<br/>   
`inputClassName` - `string` - input field className ,<br/>   
`errorsClassName` - `string` - error list className,<br/>   
`errorClassName` - `string` - error className,<br/>   
`showError` - `Boolean`  flag if show error list ( default: true),<br/> 
### Hook
For using hook import it from `react-input-validator`

    import {useSingleValidation} from 'react-input-validator';
    
    const rules = [{
        required: true,
        message: 'This field is required'
    }]
    const trigger = 'onChange'
    export const Input = () => {
    		const {  
    		  onTrigger,  
    		  errors,
    		  forceValidation  
    		} = useSingleValidation({ trigger, rules });
    		return <input onChange={onTrigger.onChange}/>
    }
`forceValidation`  - `function(value)` run validation with `value`<br/> 
`errors` `string|ReactNode[]` - validation errors<br/> 
`onTrigger` `function{}` - hendlers which sould be added to `<input />`  tag <br/> 
## Available Scripts

In the project directory, you can run:

### `npm run watch`

Runs the file watcher. After changes, run build.   


### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
