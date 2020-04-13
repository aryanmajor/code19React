import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Question = styled.div`
  width: 80%;
  height: 30px;
  margin: 20px 0px;
  border: 0;
  border-top: 1px solid #000;
  font-size: 1.5em;
  font-weight: 100;
  outline-color: transparent;
  outline-style: none;
  & :focus {
    outline-color: transparent;
    outline-style: none;
  }
  & img{
    margin-left:15%;
    max-width: 70%;
  }
`;

class QuestionBox extends Component{
  constructor(props){
    super(props);
    this.state={
      interest: 1
    };
  }

  uploadNewImage(base64, id){

    axios({
      method: 'POST',
      url: 'http://localhost:7000/newImage',
      data: {
        newImage: base64
      }
    }).then((response)=>{
      console.log('response', response);
      document.getElementById(id).src=response.data.name;
    }).catch((err)=>{
      this.setState({
        error: true,
        errorMessage: 'Unable to upload image'
      });
    });
  }

  componentDidMount(){
    document.getElementById('questionBox').addEventListener('paste', (event)=>{
      console.log(event);
      const pastedData = event.clipboardData.items[0];
      if(pastedData.type.indexOf('image')===0){
        const file=pastedData.getAsFile();
        const newImage=document.createElement('img');
        newImage.file=file;
        const newId=`${Date.now()}`;
        newImage.id=newId;
        document.getElementById('questionBox').appendChild(newImage);
        // add <p> as parent of img
        const reader = new FileReader();

        reader.onload = (function(newImage) {
          return function(event) {
            // newImage.src = event.target.result;
            const src = event.target.result;
            axios({
              method: 'POST',
              url: 'http://localhost:7000/newImage',
              data: {
                newImage: src
              }
            }).then((response)=>{
              console.log('response', response);
              newImage.src=response.data.newURL;
              
            }).catch((err)=>{
              console.log(err);
            });
          };
        })(newImage);

        reader.readAsDataURL(file);
        // this.uploadNewImage(newImage.src, newImage.id);
      }
    });
  }

  render(){
    return(
      <Question contentEditable id="questionBox">
  
      </Question>
    );
  }

}

export default QuestionBox;