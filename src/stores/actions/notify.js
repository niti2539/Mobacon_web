import { actionType } from "../actions";

export const setNotify = dispatch => number => {
  dispatch({
    type: actionType.UPDATE_NOTIFY,
    data: { count: number }
  });
};

export const refreshNotify = dispatch => () => {
  window.socket.emit("web-count-unread-chat", null, payload => {
    if (payload.ok) {
      setNotify(dispatch)(payload.data);
      // console.log("Set notify", payload.data);
    } else {
      console.log("Error get unread chat", payload);
    }
  });
};
