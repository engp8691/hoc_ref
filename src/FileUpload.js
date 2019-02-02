import React, { Component } from 'react';
import axios from 'axios';

class FileUpload extends Component{
	state = {
		selectedFile : null
	}

	fileSelect = (event) => {
		this.setState({selectedFile: event.target.files[0]})
		console.log(event.target.files[0])
	}

	fileUpload = () => {
		const fd = new FormData();
		fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
		axios.post('/', fd, {
			onUploadProgress: progressEvent => {
				console.log(progressEvent.loaded / progressEvent.total)
			}
		});
	}

	render() {
		return (
			<div>
				<input type="file" onChange = {this.fileSelect} />
				<button onClick = {this.fileUpload}>Upload</button>
			</div>
		);
	}
}

export default FileUpload;

