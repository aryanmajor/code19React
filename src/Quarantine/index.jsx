import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button, Menu, MenuItem } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';
import NewPatient from './NewPatient';
import PatientList from './PatientList';
import Dashboard from './Dashboard';
import PatientDetails from './PatientDetails';

class Forum extends Component{

  state={
    dropdown: false
  };

  handleDropDown(num){
    if(num){
      this.setState({
        dropdown: true
      })
    }
    else{
      this.setState({
        dropdown: false
      })
    }
  }

  render(){
    return(
      <React.Fragment>
        <AppBar position="static" style={{ backgroundColor: '#1D2A34' }}>
        <Toolbar>
            <NavLink to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
              <Typography variant="h5">
                Quarant
              </Typography>
              
            </NavLink>
            <span style={{ marginLeft: 'auto' }}>
              <NavLink to="/list" style={{ color: 'inherit', textDecoration: 'none' }}>
                <Button color="inherit">
                  <DescriptionIcon  />
                    View Profile
                </Button>
              </NavLink>
            </span>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: '2vh' }}>
          <Switch>
            <Route path='/new-patient' component={NewPatient} />
            <Route path='/patient/:id' component={PatientDetails} />
            <Route path='/list' component={PatientList} />
            <Route path='/' component={Dashboard} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
};

export default Forum;