import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Grid, Card, Avatar, Tooltip, LinearProgress } from '@material-ui/core';

const UnknownInfo = styled(LinearProgress)`
  background-color: #CDCDCD;
  width: 50%;
  margin-left: 25%;
  & div {
    background-color: #57beff;
  }
`;
const AnswerBox = styled(Paper)`
  :hover{
    background-color: #fcfcfc;
    cursor: pointer;
  }
`;

const DisplayQues = (props)=>{
  return(
    <Grid item sm={6} xs={12} md={4} style={{ padding: '0', marginTop: '4vh', marginRight: '5px' }} onClick={props.onClick}>
        <Tooltip title={`Bed No: ${props.bedNo} , Age: ${props.age}`} placement="right">

          <Card style={{ padding: '2vh 1vw', backgroundColor: '#0471A6', color:'#CDDDDD', minHeight: '32vh' }}>
            <div>
              <Avatar style={{ display: 'inline-flex', marginRight: '15px' }}></Avatar>
                <span style={{ fontSize: '2.5vh' }}>
                  {props.name} ({props.sex})
                </span>

            </div>
              <div style={{ marginTop: '20px' }}>
                <span style={{ fontSize: '6vh' }}>
                  {props.hr}
                  {!props.hr && <UnknownInfo />}
                </span>
                <span style={{ fontSize: '2vh', marginLeft: '10px' }}>
                  bpm
                </span>
              </div>
              <div style={{ margin: '10px 0' }}>
                <span style={{ fontSize: '5vh' }}>
                  {props.bp}
                  {!props.bp && <UnknownInfo />}
                </span>
                <br />
                <span style={{ fontSize: '2vh', marginLeft: '10px' }}>
                  mm of Hg
                </span>
              </div>
              <div style={{ }}>
                <span style={{ fontSize: '6vh' }}>
                  {props.bt}
                  {!props.bt && <UnknownInfo />}
                </span>
                <span style={{ fontSize: '2vh', marginLeft: '10px' }}>
                  &#8451;
                </span>
              </div>

          </Card>
        </Tooltip>
    </Grid>

  )
};

export default DisplayQues;