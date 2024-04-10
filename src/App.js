import React, { useState } from 'react';
import { Container, Row, Col, Button,  } from 'react-bootstrap';

import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Dashboard from './components/DashBoard';




const App = () => {
 
  const [currentWeek, setCurrentWeek] = useState(moment().startOf('week'));
 
  

  return (
    <Container fluid>
      <Row className="mt-3" >
        <Col>
          <h1>Task Scheduler</h1>
        </Col>
      </Row>
     
      <Row className="mt-3">
        <Col>
          <Dashboard currentWeek={currentWeek} />
        </Col>
      </Row>
    
 
    </Container>
  );
};

export default App;
