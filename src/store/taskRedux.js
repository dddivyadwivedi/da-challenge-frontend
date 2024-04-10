const { createSlice } = require("@reduxjs/toolkit");

const TaskRedux = createSlice({
  name: "TaskRedux",
  initialState: {
    createTaskLoading: false,
    createTaskResult: undefined,
    createTaskError: undefined,
    allTaskLoading: false,
    allTaskResult: undefined,
    allTaskError: undefined,
    completeTaskLoading: false,
    completeTaskResult: undefined,
    completeTaskError: undefined,
    deleteTaskLoading: false,
    deleteTaskResult: undefined,
    deleteTaskError: undefined,
  },
  reducers: {
    createTaskStart: (state, action) => {
      return {
        ...state,
        createTaskLoading: true,
        createTaskResult: undefined,
        createTaskError: undefined,
      };
    },

    createTaskSuccess: (state, action) => {
      return {
        ...state,
        createTaskLoading: false,
        createTaskResult: action.payload,
        createTaskError: undefined,
      };
    },

    createTaskFailure: (state, action) => {
      return {
        ...state,
        createTaskLoading: false,
        createTaskResult: undefined,
        createTaskError: action.payload,
      };
    },

    allTaskStart: (state, action) => {
      return {
        ...state,
        allTaskLoading: true,
        allTaskResult: undefined,
        allTaskError: undefined,
      };
    },
    allTaskSuccess: (state, action) => {
      return {
        ...state,
        allTaskLoading: false,
        allTaskResult: action.payload,
        allTaskError: undefined,
      };
    },
    allTaskFailure: (state, action) => {
      return {
        ...state,
        allTaskLoading: false,
        allTaskResult: undefined,
        allTaskError: action.payload,
      };
    },

    completeTaskStart: (state, action) => {
      return {
        ...state,
        completeTaskLoading: true,
        completeTaskResult: undefined,
        completeTaskError: undefined,
      };
    },

    completeTaskSuccess: (state, action) => {
      return {
        ...state,
        completeTaskLoading: false,
        completeTaskResult: action.payload,
        completeTaskError: undefined,
      };
    },

    completeTaskFailure: (state, action) => {
      return {
        ...state,
        completeTaskLoading: false,
        completeTaskResult: undefined,
        completeTaskError: action.payload,
      };
    },

    deleteTaskStart: (state, action) => {
      return {
        ...state,
        deleteTaskLoading: true,
        deleteTaskResult: undefined,
        deleteTaskError: undefined,
      };
    },
    deleteTaskSuccess: (state, action) => {
      return {
        ...state,
        deleteTaskLoading: false,
        deleteTaskResult: action.payload,
        deleteTaskError: undefined,
      };
    },
    deleteTaskFailure: (state, action) => {
      return {
        ...state,
        deleteTaskLoading: false,
        deleteTaskResult: undefined,
        deleteTaskError: action.payload,
      };
    },

    clearAllErrorRedux : (state,action)=>{
      return{
        ...state,
        allTaskError : undefined,
        createTaskError : undefined,
        completeTaskError : undefined,
        deleteTaskError : undefined,
      }
    }
  },
});

export default TaskRedux.reducer;
export const {
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
 clearAllErrorRedux,
} = TaskRedux.actions;
