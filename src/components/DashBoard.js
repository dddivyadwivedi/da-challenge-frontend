import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import moment from "moment";
import { useState, useEffect } from "react";
import TodoEvent from "./TodoEvent";
import "./Dashboard.css";
import { connect } from "react-redux";
import * as _ from "lodash";
import AddTodoModal from "./AddTodoModal";
import {  Row, Col, Button, Spinner } from "react-bootstrap";
import { Alert } from 'react-bootstrap';
import {clearAllErrorRedux} from '../store/taskRedux';

const Dashboard = ({
  allTaskLoadingState,
  allTaskResultState,
  allTaskErrorState,
  createTaskLoadingState,
  createTaskErrorState,
  listAllTasksSagaAsyncCalled,
  createTaskSagaAsyncCalled,
  clearAllErrorAsync,
}) => {
  const [title, setTitle] = useState("");
  const [selectedDateFromDatePicker, setDateFromDatePicker] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [startDate, setStartDate] = useState(
    moment().startOf("week").format("YYYY-MM-DDT00:00:00.000") + "Z"
  );
  const [endDate, setEndDate] = useState(
    moment().endOf("week").format("YYYY-MM-DDT00:00:00.000") + "Z"
  );

  const [showAddModal, setShowAddModal] = useState(false);
  const handleAddModal = () => setShowAddModal(true);
  const handleHideAddModal = () => {
    setTitle("")
    setDateFromDatePicker(new Date().toISOString().split('T')[0]);
    setShowAddModal(false)};
  const locales = {
    "en-US": require("date-fns/locale/en-US"),
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });


  useEffect(() => {
    if (startDate && endDate) {
      listAllTasksSagaAsyncCalled({ startDate: startDate, endDate: endDate });
    }
  }, [startDate]);
  const createTask = () => {
    if(title.length === 0  ){
      alert("Title is missing")
    }else{
    createTaskSagaAsyncCalled({
      task: {
        title,

        startDate:
          moment(selectedDateFromDatePicker).format("YYYY-MM-DDT00:00:00.000") +
          "Z",
        endDate:
          moment(selectedDateFromDatePicker).format("YYYY-MM-DDT00:00:00.000") +
          "Z",
      },
      startDate: startDate,
      endDate: endDate,
    });
    setTitle("");
    setDateFromDatePicker(new Date());
    handleHideAddModal();
  }
  };

  return (
    <div>
      {(allTaskLoadingState || createTaskLoadingState) && <Spinner/>}
     {(createTaskErrorState || allTaskErrorState) && <Alert variant="danger" onClose={() =>  clearAllErrorAsync()} dismissible>
          {(createTaskErrorState || allTaskErrorState)}
        </Alert>
}
      <Row className="mt-3">
        <Col>
          <Button onClick={handleAddModal}>Add Schedule</Button>
        </Col>
      </Row>
      <AddTodoModal
        show={showAddModal}
        onHide={handleHideAddModal}
        date={selectedDateFromDatePicker}
        title={title}
        setTitle={setTitle}
        setDate={setDateFromDatePicker}
        createTaskAction={createTask}
      />
      <Calendar
        className="calendar"
        localizer={localizer}
        events={allTaskResultState}
        // onRangeChange={(e) => {
        //   console.log('e' , e)
        //   if(e !== undefined ){
        //   setStartDate(moment(e[0]).format("YYYY-MM-DDT00:00:00.000") + "Z");
        //   setEndDate(
        //     moment(e[e.length - 1]).format("YYYY-MM-DDT00:00:00.000") + "Z"
        //   );
        //   }
        // }}
        defaultDate={moment()}
        components={{
          event: ({ event }) => (
            <TodoEvent event={event} startDate={startDate} endDate={endDate} />
          ),
        }}
        startAccessor="start"
        endAccessor="end"
        views={{ week: true }} 
        defaultView={Views.WEEK}
      />
    </div>
  );
};

const mapStateToProps = ({ TaskRedux }) => {
  let allTaskLoadingState = _.get(TaskRedux, "allTaskLoading", false);
  let allTaskResultState = _.get(TaskRedux, "allTaskResult", undefined);
  let allTaskErrorState = _.get(TaskRedux, "allTaskError", undefined);
  let createTaskLoadingState = _.get(TaskRedux, "createTaskLoading", false);
  let createTaskResultState = _.get(TaskRedux, "createTaskResult", undefined);
  let createTaskErrorState = _.get(TaskRedux, "createTaskError", undefined);
  return {
    allTaskLoadingState,
    allTaskResultState,
    allTaskErrorState,
    createTaskLoadingState,
    createTaskResultState,
    createTaskErrorState,
  };
};

const mapDispatchToProps = (dispatch) => ({
  listAllTasksSagaAsyncCalled: (data) =>
    dispatch({ type: "getAllTaskSagaCall", payload: data }),
  createTaskSagaAsyncCalled: (data) =>
    dispatch({ type: "createTaskSagaCall", payload: data }),

    clearAllErrorAsync : ()=> dispatch(clearAllErrorRedux())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
