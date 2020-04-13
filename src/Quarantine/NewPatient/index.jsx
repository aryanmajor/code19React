import React, { Component } from 'react';
import QuestionBox from './QuestionBox';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import { Grid, Divider } from '@material-ui/core';


class NewQuestion extends Component{
  constructor(props){
    super(props);
    this.state={
      values:{
        name:'',
        age:0,
        sex:'',
        quarantineID: '154584AB',
        bedNo: '',
        macID: ''
      },
      submitLoading: false,
      error: false,
      errorMessage: ''
    };
  }

  handleFormChanges(field, value){
    this.setState({
      values:{
        ...this.state.values,
        [field]: value
      }
    });
  }

  handleFormSubmission(){
    this.setState({
      submitLoading: true
    });
    // const data ={...this.state.values, question: document.getElementById('questionBox').innerHTML};
    console.log(this.state.values);
    axios({
      method: 'POST',
      url: '/patient/newPatient',
      data: this.state.values
    }).then((response)=>{
      console.log(response);
      this.props.history.push('/list');
    }).catch((e)=>{
      console.log(e);
      this.setState({
        submitLoading: false,
        error: true,
        errorMessage: e.message
      })
    });
  }

  render(){
    const {name, sex, age,macID, quarantineID, bedNo}=this.state.values;
    return(
      <Container fixed style={{ width: '70vw', padding: '5% 0%', textAlign: 'left' }}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={10}>
            <TextField placeholder="Name of Patient" label="Name"
              onChange={(event)=> this.handleFormChanges('name', event.target.value)} value={name} fullWidth  required
            />

          </Grid>
          <Grid item sm={12} md={4}>
            <TextField label="Age" type="number" required value={age} onChange={(event)=> this.handleFormChanges('age', event.target.value)} />
          </Grid>
          <Grid item sm={12} md={4}>
            <TextField label="Gender" required value={sex} onChange={(event)=> this.handleFormChanges('sex', event.target.value)} />
          </Grid>
          <Grid item sm={12} md={4}>
            <TextField label="Bed Number" required value={bedNo} onChange={(event)=> this.handleFormChanges('bedNo', event.target.value)} />
          </Grid>
        </Grid>
        <Grid container spacing={3} style={{ margin: '5vh 0' }}>
          <Grid item sm={12} md={4}>
          <TextField label="Device MAC Number" required value={macID} helperText="Look on the arm band for the number" onChange={(event)=> this.handleFormChanges('macID', event.target.value)} />
          </Grid>
          <Grid item sm={12} md={4}>
          <TextField label="Quantine ID" disabled value={quarantineID} helperText="The unique ID for each centers"  />
          </Grid>
        </Grid>
        {/* <NameField label="Question" value={question} multiline fullWidth onChange={(event)=> this.handleFormChanges('question', event.target.value)} required /> */}
        <Grid container>
          <Button variant="contained"
            color="secondary"
            onClick={() => this.handleFormSubmission()}
            disabled={ name.length<5 || bedNo.length===0 || macID==='' || age===0}
            style={{ minHeight: '52px' , minWidth: '88px' }}
          >
            {this.state.submitLoading && (<CircularProgress color="secondary" />)}
            {!this.state.submitLoading && ("Register Patient")}
            
          </Button>
        </Grid>

        <QuestionBox />
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
      </Container>
    )
  }
};

export default NewQuestion;