import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import * as _ from "lodash";
import { connect } from "react-redux";
import "./TodoEvent.css";

const TodoEvent = ({
  event,
  startDate,
  endDate,
  completeTaskSagaAsyncCalled,
  deleteTaskSagaAsyncCalled,
}) => {
  const completeCalled = () => {
    completeTaskSagaAsyncCalled({
      id: event.id,
      startDate: startDate,
      endDate: endDate,
    });
  };

  const deleteCalled = () => {
    deleteTaskSagaAsyncCalled({
      id: event.id,
      startDate: startDate,
      endDate: endDate,
    });
  };

  return (
    <div
      className={`${
        event.status === "pending" ? "pending" : "completed"
      } container`}
    >
      {event.status === "pending" && (
        <FontAwesomeIcon
          icon={faCheckCircle}
          size="lg"
          color="green"
          className="complete"
          onClick={completeCalled}
        ></FontAwesomeIcon>
      )}

      <span>{event.title}</span>
      {event.status === "pending" && (
        <FontAwesomeIcon
          icon={faTrashAlt}
          size="lg"
          color="red"
          className="delete"
          onClick={deleteCalled}
        ></FontAwesomeIcon>
      )}
    </div>
  );
};

const mapStateToProps = ({ TaskRedux }) => {
  let completeTaskLoadingState = _.get(TaskRedux, "completeTaskLoading", false);
  let completeTaskResultState = _.get(
    TaskRedux,
    "completeTaskResult",
    undefined
  );
  let completeTaskErrorState = _.get(TaskRedux, "completeTaskError", undefined);
  return {
    completeTaskLoadingState,
    completeTaskResultState,
    completeTaskErrorState,
  };
};

const mapDispatchToProps = (dispatch) => ({
  completeTaskSagaAsyncCalled: (data) =>
    dispatch({ type: "completeTaskSagaCall", payload: data }),
  deleteTaskSagaAsyncCalled: (data) =>
    dispatch({ type: "deleteTaskSagaCall", payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoEvent);
