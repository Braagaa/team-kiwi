import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment';
import {
  Avatar,
  Card,
  CardHeader,
  CardActions,
  CardActionArea,
  CardContent,
  Grid,
  TextField,
  Button,
  ButtonBase,
  Snackbar,
  IconButton,
  Typography,
  Modal,
  Backdrop,
  Fade,
} from '@material-ui/core';
import axios from 'axios';
import CardMedia from '@material-ui/core/CardMedia';

function Alert(props) {
  return <MuiAlert elevation={7} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 360,
    height: 125,
    marginTop: theme.spacing(1),
  },
  button: {
    // width: 358,
    // height: 123,
    // padding: 0,
    // flexDirection: 'row',
    // display: 'flex',
  },
  header: {
    marginTop: theme.spacing(0),
    height: 50,
    padding: theme.spacing(1),
  },
  contents: {
    padding: theme.spacing(0.5),
  },
  date: {
    float: 'left',
    marginLeft: theme.spacing(0.5),
    marginTop: theme.spacing(1),
  },
  settings: {
    float: 'right',
  },
  avatar: {
    float: 'left',
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginLeft: theme.spacing(1),
  },
  name: {
    float: 'left',
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1.5),
  },
  status: {
    float: 'right',
    marginTop: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
    color: theme.palette.text.secondary,
  },
}));

export default function JobComponent(props) {
  const classes = useStyles();
  const [accepted, setAccepted] = useState();
  const [declined, setDeclined] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [jobKey, setKey] = useState();

  useEffect(() => {
    setAccepted(props.booking.accepted);
    setDeclined(props.booking.declined);
    setStart(moment(props.booking.start).format('YYYY-MM-DDTHH:mm'));
    setEnd(moment(props.booking.end).format('YYYY-MM-DDTHH:mm'));
    setKey(props.jobKey);
  }, [props]);

  const fullName =
    props.booking.ownerProfile[0].firstName + ' ' + props.booking.ownerProfile[0].lastName;

  const handleStatus = () => {
    return accepted ? 'ACCEPTED' : declined ? 'DECLINED' : 'PENDING';
  };

  const handleDate = () => {
    const _start = moment(start);
    const _end = moment(end);
    const endString = () => {
      if (_start.year() === _end.year()) {
        if (_start.month() === _end.month()) {
          if (_start.day() === _end.day()) return _end.format('hA');
          else return _end.format('D MMM, hA');
        } else return _end.format('D MMM, hA');
      } else return _end.format('D MMM YYYY, hA');
    };
    return _start.format('D MMM YYYY, hA-') + endString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(jobKey);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card className={classes.root} variant="outlined">
          <CardActionArea className={classes.button} onClick={handleSubmit}>
            <CardContent className={classes.header}>
              <Typography variant="body" className={classes.date}>
                {handleDate()}
              </Typography>
            </CardContent>
            <CardContent className={classes.contents}>
              <Avatar
                aria-label="recipe"
                className={classes.avatar}
                alt="T"
                src="/images/profile_3.jpg"
              />
              <Typography variant="h6" className={classes.name} gutterBottom>
                {fullName}
              </Typography>
              <Typography variant="h6" className={classes.status} gutterBottom>
                {handleStatus()}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </form>
    </>
  );
}
