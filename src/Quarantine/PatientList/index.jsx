import React, { Component } from 'react';
import socketIOClient from 'socket.io-client/dist/socket.io';
import { Link } from 'react-router-dom';
import {Container, Grid, Typography, Card, Avatar, Tooltip, LinearProgress, Modal} from '@material-ui/core';
import Warning from '@material-ui/icons/Warning'  ;
import AddIcon from '@material-ui/icons/Add';
import DispPatient from './DispPatient';
import axios from 'axios';

class QuestionList extends Component{
  constructor(props){
    super(props);
    this.state={
      list:[],
      SOS:{
        showSOS: false,
        bedNo: '',
        name: ''
      }
    };
  }

  toggleBodyVitals(macID, bv, val){
    if(bv==='sos'){
      const index=this.state.list.map(patient=> patient.macID).indexOf(macID);
      this.setState(pState=>{
        return({
            ...pState,
            SOS:{
            showSOS: true,
            bedNo: pState.list[index].bedNo,
            name: pState.list[index].name
          }
        })
      })
    }
    else{
      const index=this.state.list.map(patient=> patient.macID).indexOf(macID);
      console.log(index);
      const {list} = this.state;
      list[index][bv]=val;
      console.log(list);
      this.setState({
        list: [...list]
      })
    }
  }

  componentDidMount(){
    axios.get('/patient/allPatientList').then((response)=>{
      this.setState({
        list: [...response.data]
      });
      const socket= socketIOClient();
      socket.on('connect', ()=>{
        console.log('COnnected');
      })
      socket.on('heartrate', data=>{
        console.log(data);
        this.toggleBodyVitals(data.macID, 'hr', data.val)
      });
      socket.on('bodytemp', data=>{
        console.log(data);
        this.toggleBodyVitals(data.macID, 'bt', data.val)
      });
      socket.on('bloodpr', data=>{
        console.log(data);
        this.toggleBodyVitals(data.macID, 'bp', data.val)
      });
      socket.on('sos', data=>{
        console.log(data);
        this.toggleBodyVitals(data.macID, 'sos', data.val)
      });
    }).catch((err)=>{
      console.log(err);
    });
  }

  closeModal(){
    this.setState({
      SOS:{
        showSOS: false
      }
    })
  }

  render(){
    const {list}= this.state || [];
    let patientList = list.map((patient)=>{
          return(
            <DispPatient
              bedNo={patient.bedNo}
              age={patient.age}
              sex={patient.sex}
              key={patient._id}
              name={patient.name}
              bp={patient.bp}
              bt={patient.bt}
              hr={patient.hr}
              onClick={()=> this.props.history.push(`/patient/${patient._id}`)}
            />
          )
      });
    return(
      <Container style={{ padding: '0 4vw' }}>
        <Grid container spacing={4}>
          {patientList}
          

          <Grid item sm={6} xs={12} md={4} style={{  padding: '0', cursor: 'pointer', marginTop: '4vh'}}>
              <Link to={'/new-patient'}>
                <Tooltip title={'Click to add new patient'} placement="right">
                  <Card style={{ padding: '2vh 1vw', color: '#0471A6', backgroundColor:'#CDDDDD' }}>
                    <AddIcon style={{ fontSize: '10vh' }} />
                    
                  </Card>
                </Tooltip>
              </Link>
          </Grid>
        
        </Grid>
        
        <Modal
          open={this.state.SOS.showSOS}
          onClose={()=> this.closeModal()}
        >
          <Card style={{ width: '30%', margin:'10% 35%', textAlign: 'center', padding: '3vh 0', color: '#AB1717', backgroundColor: 'FDFFFC' }}>
            <Typography variant="h5">
              Patient has crossed safe boundary.
            </Typography>
            
            <Warning style={{ fontSize: '10vh' }} />

            <Typography variant="h6">
              Bed No: {this.state.SOS.bedNo}<br />
              Name: {this.state.SOS.name}
            </Typography>
          </Card>
        
        </Modal>
      </Container>
    )
  }
};

export default QuestionList;