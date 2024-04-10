import axios from "axios";
import {  put } from "redux-saga/effects";
import {
  createTaskStart,
 createTaskSuccess,
 createTaskFailure,
 completeTaskStart,
 completeTaskSuccess,
 completeTaskFailure,
 allTaskStart,
 allTaskSuccess,
 allTaskFailure,
 deleteTaskStart,
 deleteTaskSuccess,
  deleteTaskFailure,
} from "./taskRedux";

let API_URL = "http://localhost:3005/api";

export function* listAllTaskSaga({ payload }) {
  try {
    const { startDate, endDate } = payload;
    yield put(allTaskStart());
    let result = yield axios.get(
      `${API_URL}/tasks/getAllTasks?startDate=${startDate}&endDate=${endDate}`
    );
    let modifiedResult = result.data.map((itm) => {
      let modifiedDate = new Date(itm.startDate);
      return {
        id: itm.id,
        title: itm.title,
        status: itm.status,
        start: new Date(modifiedDate.setHours(0, 0, 0, 0)),
        end: new Date(modifiedDate.setHours(0, 0, 0, 0)),
      };
    });
    yield put(allTaskSuccess(modifiedResult));
  } catch (err) {
    let error = err.response.data.message
      ? err.response.data.message
      : err.response.data.error;
    yield put(allTaskFailure(error));
  }
}

export function* createTaskSaga({ payload }) {
  try {
    const { task, startDate, endDate } = payload;
    yield put(createTaskStart());
    let result = yield axios.post(
      `${API_URL}/tasks/createTask`,
      { ...task },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    yield put(createTaskSuccess(result.data));
    yield put({
      type: "getAllTaskSagaCall",
      payload: { startDate: startDate, endDate: endDate },
    });
  } catch (err) {
    let error = err.response.data.message
      ? err.response.data.message
      : err.response.data.error;
    yield put(createTaskFailure(error));
  }
}

export function* completeTaskSaga({ payload }) {
  try {
    const { id, startDate, endDate } = payload;
    yield put(completeTaskStart());

    let result = yield axios.patch(
      `${API_URL}/tasks/completeTask/${id}`
    );
    yield put(completeTaskSuccess(result.data));
    yield put({
      type: "getAllTaskSagaCall",
      payload: { startDate: startDate, endDate: endDate },
    });
  } catch (err) {
    let error = err.response.data.message
      ? err.response.data.message
      : err.response.data.error;
    yield put(completeTaskFailure(error));
  }
}

export function* deleteTaskSaga({ payload }) {
  try {
    const { id, startDate, endDate } = payload;
    yield put(deleteTaskStart());

    let result = yield axios.delete(`${API_URL}/tasks/deleteTask/${id}`);
    yield put(deleteTaskSuccess(result.data));
    yield put({
      type: "getAllTaskSagaCall",
      payload: { startDate: startDate, endDate: endDate },
    });
  } catch (err) {
    let error = err.response.data.message
      ? err.response.data.message
      : err.response.data.error;
    yield put(deleteTaskFailure(error));
  }
}
