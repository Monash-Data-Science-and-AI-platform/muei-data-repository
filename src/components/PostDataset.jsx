import React from 'react';
import Form from 'react-jsonschema-form';
import emailjs from 'emailjs-com';

class PostDataset extends React.Component{
	onSubmitForm(formData) {
		const templateParams = {
			name: formData.name,
			email: formData.email,
      message: formData.message,
      subscribe: formData.subscribe
		}
		emailjs.send('gmail', 'template_7oDz4B6T', templateParams, 'user_QAUruhPQ0MpGqcIy5zffv').then(function(response) {
			//Send notification to user of form submit
			alert('Email sent!');
			console.log(templateParams);
			console.log('SUCCESS!', response.status, response.text);
		}, function(error) {
			console.log('FAILED...', error);
		});
	}
	render(){
		// Create form schemas
		let schema ={
			"type": "object",
			"required": [
				"name",
				"email",
				"message"
			],
	
			"properties": {
				"name": {
					"title": "Name",
					"type": "string",
				},
				"email": {
					"title": "Email",
					"type": "string",
					"format": "email"
				},
				"message": {
					"title": "Message",
					"type": "string"
				},
				"subscribe":{
					"title": " I want to be notified when new datasets are added!",
					"type": "boolean",
					"default": true
				}
			}
		}
		let uiSchema = {
			"name": {
				"ui:placeholder": "Enter your name here."
			},
			"email":{
				"ui:widget": "text",
				"ui:placeholder": "What is your email?"
			},
			"message": {
				"ui:widget": "textarea",
				"ui:placeholder": "Type your message!"
			}
		}

		return(
			<div className = "container">
				<h2> Contribute a Dataset! </h2>
				<p>
          Have a dataset to contribute? Get in Touch with us to find out how sensitive and restricted data can be made accessible through our safe haven platorm.
        </p>
				<hr/>
				<h2> Contact Us! </h2>
				<p>In the form below, you can leave us a message or drop 
					us a link to an interesting dataset you found (or would like to see)! </p>
				<Form className="postDataset" schema={schema} uiSchema={uiSchema} onSubmit={e => this.onSubmitForm(e.formData)} />
			</div>
		);
	}
}

export default PostDataset;