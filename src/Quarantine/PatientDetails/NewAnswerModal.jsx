import React, { Component } from 'react';
import axios from 'axios';
import { Paper, TextField, Modal, Typography, Button, CircularProgress, Snackbar } from '@material-ui/core';
import styled from 'styled-components';

const AnsweringModal=styled(Paper)`
  width: 50%;
  position: absolute;
  padding: 2%;
  top: 10%;
  left:25%;
`;
const NameField = styled(TextField)`
  width: 50%;
  margin: 2% 0% !important;
`;


class NewAnswerModal extends Component{

  constructor(props){
    super(props);
    this.state={
      submitLoading: false,
      error: false,
      errorMessage: '',
      answer: {
        ansBy: '',
        answer: ''
      }
    };
  }

  handleFormChanges(field, value){
    this.setState((prevState)=>{
      return({
        ...prevState,
        answer:{
          ...prevState.answer,
          [field]: value
        }
      })
    });
  }
  
  handleFormSubmission(){
    this.setState({
      submitLoading: true
    });
    const data ={
      ...this.state.answer,
      id: this.props.id
    };

    axios({
      method: 'POST',
      url: '/answerQuestion',
      data
    }).then((response)=>{
      this.props.onSubmit();
    }).catch((e)=>{
      console.log(e);
      this.setState({
        submitLoading: false,
        error: true,
        errorMessage: e.message
      })
    });
  }
  
  renderAnsweringModal(){
    const { ansBy, answer } = this.state.answer;
    return (
    <Modal
      open={this.props.open}
      onClose={()=> this.props.closeModal()}
    >
      <AnsweringModal>
        <Typography variant="h5" color="textSecondary" >Write an answer</Typography>
  
        <NameField label="Your Name" required value={ansBy} onChange={(event)=> this.handleFormChanges('ansBy', event.target.value)} />
        <NameField label="Answer" value={answer} multiline fullWidth onChange={(event)=> this.handleFormChanges('answer', event.target.value)} required />
        <Button variant="contained" color="secondary" onClick={() => this.handleFormSubmission()}
          disabled={this.state.submitLoading || answer.length===0 || ansBy.length===0}
          style={{ minHeight: '52px' , minWidth: '88px' }}
        >
          {this.state.submitLoading && (<CircularProgress color="secondary" />)}
          {!this.state.submitLoading && ("Submit")}
          
        </Button>
  
        <Snackbar
          open={this.state.error}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          message={this.state.errorMessage}
          variant="error"
          onClose={()=> {
            this.setState({
              error: false
            })
          }}
          autoHideDuration={5000}
        />
      </AnsweringModal>
    </Modal>
    )
  }

  render(){
    return(this.renderAnsweringModal());
  }

}

export default NewAnswerModal;