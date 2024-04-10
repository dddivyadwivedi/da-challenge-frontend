import { all, takeLatest } from "redux-saga/effects";
import {
createTaskSaga,
listAllTaskSaga,
completeTaskSaga,
deleteTaskSaga
} from "./taskSaga";

export default function* root() {
  yield all([
    takeLatest("createTaskSagaCall", createTaskSaga),
    takeLatest("getAllTaskSagaCall", listAllTaskSaga),
    takeLatest("completeTaskSagaCall", completeTaskSaga),
    takeLatest("deleteTaskSagaCall", deleteTaskSaga),
  ]);
}
