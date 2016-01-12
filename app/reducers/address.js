import * as types from '../actions/actionTypes';
import {ListView} from 'react-native';

var ds = new ListView.DataSource({ rowHasChanged:(r1,r2) => r1.place_id !== r2.place_id });
const initialState = {isLoading:false, searchString: '153 city road melbourne',addresses:ds.cloneWithRows([])};

export default function addressesByGeoEncoding(state = initialState, action = {}){
  console.log("Receiver : " + action);
  switch (action.type) {
    case types.CHANGE_SEARCH_TEXT:
        return Object.assign({},state, { searchString: action.searchString});
    case types.REQUEST_ADDRESS:
        return Object.assign({},state, { isLoading:true});
    case types.RECEIVE_ADDRESS:
      return Object.assign({},state, { isLoading:false, addresses: ds.cloneWithRows(action.addresses)});
    case types.RESET_STATE:
      return Object.assign({},state, initialState);
    case types.ROW_PRESS:
      action.routerAction()
      return state;
    default:
      return state;
  }
}
