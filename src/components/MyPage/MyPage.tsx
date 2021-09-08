import React from 'react';

import logo from './../../logo.svg';
import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
import { Button, Paper } from '@material-ui/core';

const MyPage = () => (
  <Paper>
    {/*
    Pseudo-html for the future...
    <h1>Ops Dashboard for {{team.name}}</h1>
    <JobSelect />
    <JobProvider>
      <left side>
        <CurrentTasksGrid />
        <PopupButton (create task for me) />
        <PopupButton (create task for other) />
        <LatestEventsGrid />
        <PopupButton (report event) />
      </left side>
      <right side>
        <MonthProvider>
          <MonthSelect />
          <MonthStats />
          <MonthGoalsGrid />
          <MonthCompletedTasksGrid />
        </MonthProvider>
      </right side>
    </JobProvider>
    */}
    <img src={logo} className="App-logo" alt="logo" />
    <Typography variant="h4" component="h1" gutterBottom>
      Create React App + Material-UI
    </Typography>
    <Button variant="contained" color="primary">
      Primary Button
    </Button>
    <Button variant="contained" color="secondary">
      Secondary Button
    </Button>
  </Paper>
);

export default MyPage;
