import React, { Component } from 'react';
import socketIOClient from 'socket.io-client/dist/socket.io';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import styled from 'styled-components';
import Warning from '@material-ui/icons/Warning'  ;
import { Grid, Container, Avatar, Modal } from '@material-ui/core';
import CanvasJSReact from '../../canvas/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const InfoPaper = styled(Card)`
  width: 90%;
  background-color: #331E36;
  color: #fff;
  padding: 3vh 1vw;
  margin: 0% 0%;
  div.info{
    width: 90%;
    height: 100%;
    margin-left: 10%;
  }
  div.action{
    float: left;
    margin:5% 1%;
    a:hover{
      cursor: pointer;
    }
  }
`;

const KeyName = styled.strong`
  margin-right: 10px;
`;

class QuestionList extends Component{
  constructor(props){
    super(props);
    this.state={
      patient:{
        name: 'Aryan',
        age: 15,
        sex: 'M',
        macID: '1010A',
        bedNo: 'A302',
        hr: [
          {
            "_id": "5e927598f63fb014f51066b9",
            "time": 1586656664.173,
            "val": 72
          },
          {
            "_id": "5e9275af903e6b151d50643c",
            "time": 1586656687.312,
            "val": 72
          },
          {
            "_id": "5e9277989c517317babbfdd8",
            "time": 1586657176,
            "val": 72
          },
          {
            "_id": "5e9278bb4d0c9319b587daef",
            "time": 1586657467,
            "val": 72
          },
          {
            "_id": "5e9279068adbe61a0f2865e4",
            "time": 1586657542,
            "val": 72
          },
          {
            "_id": "5e929a94787e922fdad8c30f",
            "time": 1586666132,
            "val": 82
          },
          {
            "_id": "5e929aa7787e922fdad8c310",
            "time": 1586666151,
            "val": 82
          },
          {
            "_id": "5e929aa9787e922fdad8c311",
            "time": 1586666153,
            "val": 92
          },
          {
            "_id": "5e929aab787e922fdad8c312",
            "time": 1586666155,
            "val": 72
          },
          {
            "_id": "5e929cc3c24ca23165567ee5",
            "time": 1586666691,
            "val": 72
          },
          {
            "_id": "5e929d2348b10031ebd2d4d8",
            "time": 1586666787,
            "val": 72
          },
          {
            "_id": "5e929d9b2e480c329ababb38",
            "time": 1586666907,
            "val": 72
          },
          {
            "_id": "5e929e09a72de933068ff8f7",
            "time": 1586667017,
            "val": 72
          },
          {
            "_id": "5e929e3ca72de933068ff8f8",
            "time": 1586667068,
            "val": 82
          },
          {
            "_id": "5e929e44a72de933068ff8f9",
            "time": 1586667076,
            "val": 75
          }
        ],
        bp: [ 
          {
              
              "time" : 1586657110,
              "val" : "110/80"
          }, 
          {
              
              "time" : 1586657518,
              "val" : "110/80"
          }, 
          {
              
              "time" : 1586703337,
              "val" : "180/70"
          }, 
          {
              
              "time" : 1586703794,
              "val" : "180/70"
          }, 
          {
              
              "time" : 1586703809,
              "val" : "190/70"
          }
      ]
      },
      SOS:{
        showSOS: false,
        bedNo: '',
        name: ''
      },
      submitLoading: false,
      error: false,
      errorMessage: ''
    };
  }

  toggleBodyVitals(macID, key, val){
    if(this.state.patient.macID===macID){
      this.setState((prevState)=>{
        return({
          ...prevState,
          patient:{
            ...prevState.patient,
            [key]: val
          }
        })
      });
    }
  }

  fetchQuestionDetails(id){
    axios.get(`/patient/fetchPatient/${id}`).then((response)=>{
      this.setState({
        patient: {...response.data}
      }, ()=>{
        console.log(this.state);
      });
      const socket= socketIOClient();
      socket.on('connect', ()=>{
        console.log('COnnected');
      })
      socket.on('heartrate', data=>{
        console.log(data);
        this.toggleBodyVitals(data.macID, 'currHR', data.val)
      });
      socket.on('sos', data=>{
        if(this.state.patient.macID===data.macID){
          this.setState(pState=>{
            return({
                ...pState,
                SOS:{
                showSOS: true,
                bedNo: pState.patient.bedNo,
                name: pState.patient.name
              }
            })
          })
        }
      })
      socket.on('bodytemp', data=>{
        this.toggleBodyVitals(data.macID, 'currBT', data.val);
      });
      socket.on('bloodpr', data=>{
        this.toggleBodyVitals(data.macID, 'currBP', data.val);
      });
      
    }).catch((err)=>{
      console.log(err);
    });
  }

  componentDidMount(){
    console.log(this.props);
    this.fetchQuestionDetails(this.props.match.params.id);
  }

  closeModal(){
    this.setState({
      SOS:{
        showSOS: false
      }
    })
  }

  render(){

    const {patient} = this.state;
    const heartRateOption={
      animationEnabled: true,
			title:{
				text: `Heartrate Pattern`
      },
      theme: 'dark2',
      backgroundColor: '#F15025',
			axisX: {
        valueFormatString: "hh:mm",
        title: "Time"
			},
			axisY: {
				title: "Beats per minute",
				includeZero: false
			},
			data: [{
        color: '#fff',
				yValueFormatString: "#,###",
				xValueFormatString: "hh:mm",
				type: "line",
				dataPoints: patient.hr && patient.hr.slice(-10).map((hr, i)=> ({x: new Date(hr.time*100), y: hr.val}))
			}]
    }
    const bodyTempOption={
      animationEnabled: true,
			title:{
				text: `Body Temperature Pattern`
      },
      theme: 'light1',
      backgroundColor: '#F2F3D9',
			axisX: {
        valueFormatString: "hh:mm",
        title: "Time"
			},
			axisY: {
				title: "Degree C",
				includeZero: false
			},
			data: [{
        color: '#000',
				yValueFormatString: "#,###",
				xValueFormatString: "hh:mm",
				type: "line",
				dataPoints: patient.bt && patient.bt.slice(-10).map(bt=> ({x: new Date(bt.time*100), y: bt.val}))
			}]
    }
    const bloodPressOption={
      animationEnabled: true,
			title:{
				text: `Blood Pressure Pattern`
      },
      theme: 'dark2',
      backgroundColor: '#01172F',
			axisX: {
        valueFormatString: "hh:mm",
        title: "Time"
			},
			axisY: {
				title: "mm Of Hg",
				includeZero: false
			},
			data: [{
        color: '#fff',
				yValueFormatString: "#,###",
				xValueFormatString: "hh:mm",
        type: "rangeColumn",
        toolTipContent: "<strong>{x}</strong></br> {y[0]}/ {y[1]}",
				dataPoints: patient.bp && patient.bp.slice(-10).map(bp=> {
          let arr=bp.val.split('/');
          console.log(arr)
          return ({x: new Date(bp.time*100), y: [parseInt(arr[0], 10), parseInt(arr[1], 10)]})
        })
			}]
    }
    console.log(bloodPressOption)
    return(
      <Container>
        <Grid container spacing={5} style={{ padding: '5% 0%' }}>
          <Grid item sm={12} md={6}>
            <InfoPaper >
              <Grid container style={{textAlign: 'left', fontSize: '2.5vh', padding: '2vh 2vw'}}>
                <Grid item sm={12}>
                  <Avatar style={{ backgroundColor: 'orange', width: '8vh', fontSize: '4vh', height: '8vh', display: 'inline-flex' }}>{patient.name && patient.name[0].toUpperCase()}</Avatar> 
                  <span style={{ fontSize: '4vh', marginLeft: '25px' }}>
                    {patient.name}
                  </span>
                </Grid>
                </Grid>
                <Grid container style={{ marginTop: '1.5vh', fontSize: '2vh' }}>
                 <Grid item sm={6} style={{paddingLeft: '2vw', textAlign: 'left'}}>
                   <div style={{ marginBottom: '10px' }}>
                    <KeyName>
                      Name: 
                    </KeyName>
                    {patient.name}
                   </div>
                   <div  style={{ marginBottom: '10px' }}>
                    <KeyName>
                      Age:
                    </KeyName>
                    {patient.age}
                    
                    </div>
                    <div>
                      <KeyName>
                        Gender:
                      </KeyName>
                      {patient.sex}

                    </div>
                  </Grid>
                  <Grid item sm={6}  style={{paddingLeft: '2vw'}}>
                   <div  style={{ marginBottom: '10px' }}>
                    <KeyName>
                      Device MacID:
                    </KeyName>
                    {patient.macID}
                  </div>
                  <div  style={{ marginBottom: '10px' }}>
                    <KeyName>
                      Bed Number:
                    </KeyName>
                    {patient.bedNo}
                    </div>
                  </Grid> 
              </Grid>
            </InfoPaper>  
          </Grid>
          <Grid item sm={12} md={6}>
            <InfoPaper >
            <div style={{ marginTop: '20px' }}>
                <span style={{ fontSize: '5vh' }}>
                  {patient.currHR}
                </span>
                <span style={{ fontSize: '2vh', marginLeft: '10px' }}>
                  bpm
                </span>
              </div>
              <div style={{ margin: '10px 0'}}>
                <span style={{ fontSize: '5vh' }}>
                  {patient.currBP}
                </span>
                <br />
                <span style={{ fontSize: '2vh', marginLeft: '10px' }}>
                  mm of Hg
                </span>
              </div>
              <div style={{ }}>
                <span style={{ fontSize: '5vh' }}>
                  {patient.currBT}
                </span>
                <span style={{ fontSize: '2vh', marginLeft: '10px' }}>
                  &#8451;
                </span>
              </div>
            </InfoPaper>
          </Grid>
          <Grid item sm={12} md={6}>
            <Card style={{ padding: '2vh', backgroundColor: '#F15025' }}>
              <CanvasJSChart options={heartRateOption} />

            </Card>
          </Grid>
          <Grid item sm={12} md={6}>
            <Card style={{ padding: '2vh', backgroundColor: '#F2F3D9' }}>
              <CanvasJSChart options={bodyTempOption} />
            </Card>
          </Grid>
          <Grid item sm={12} md={12}>
            <Card style={{ padding: '2vh', backgroundColor: '#01172F' }}>
              <CanvasJSChart options={bloodPressOption} />
            </Card>
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