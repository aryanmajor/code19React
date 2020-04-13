import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Fab, Grid, Typography, Card } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'  ;
import axios from 'axios';
import CanvasJSReact from '../../canvas/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state={
      list:[]
    };
  }

  componentDidMount(){
    axios.get('/patient/allPatientList').then((response)=>{
      this.setState({
        list: response.data
      })
    }).catch((err)=>{
      console.log(err);
    });
  }

  render(){
    const {list}= this.state || [];
    const options = {
        title: {
          text: "Basic Column Chart in React"
        },
        data: [{				
                  type: "column",
                  dataPoints: [
                      { label: "Apple",  y: 10  },
                      { label: "Orange", y: 15  },
                      { label: "Banana", y: 25  },
                      { label: "Mango",  y: 30  },
                      { label: "Grape",  y: 28  }
                  ]
         }]
     }
    
    return(
      <Container fixed>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <Card>
                <span style={{ fontSize: '15vh', color: '#717171' }}>
                    {list && list.length}
                </span>
                <span style={{ fontSize: '3vh', marginLeft: '15px' }}>
                    Patients
                </span>
                <Link to={'/list'} style={{ textDecoration: 'none', color: '#717171' }}>
                  <div style={{ margin: '2vh 2vw', cursor: 'pointer', textAlign: 'right' }}>
                    View All Patients
                  </div>
                </Link>
              </Card>

            </Grid>
          </Grid>
        <Link to={'/new-patient'}>
          <Fab aria-label="add"  style={{backgroundColor: '#717171', color: '#CDCDCD', position: 'fixed', bottom: '3%', left: '75%' }}>
            <AddIcon />
          </Fab>
        </Link>
      </Container>
    )
  }
};

export default Dashboard;