'use strict';

import React, {
  Component,
  Navigator
} from 'react-native';
import {bindActionCreators} from 'redux';

import { connect } from 'react-redux/native';
// import {
//   actions as routerActions,
//   Route,
//   Router,
//   Schema
// } from 'react-native-router-redux';

import {Router, Route, Schema, Animations, TabBar, Actions} from 'react-native-router-flux'
import * as styles from './RouterContainerStyles';
import TabBarItem from '../components/TabBarItem';
import * as assets from '../../assets';
//import {Router, Route, Animations, Schema, TabBar, Actions} from 'react-native-redux-router';
var {NavBar,NavBarBack, NavBarModal} = require('../components/navBar');

//import TabBar from '../components/tabBar';

import * as addressActions from '../actions/addressActions';
import * as databaseActions from '../actions/databaseActions';
import * as routerActions from '../actions/routerActions';
import AddressList from '../components/addressList';
import Favourites from '../components/favourites';
import AddressDetails from '../components/addressDetails';
import Launch from '../components/launch';
import VideoPage from '../components/videoPage';

const mapStateToProps = state => ({
  addresses : state.addressesByGeoEncoding.addresses,
  favourites : state.addressesByGeoEncoding.favourites,
  searchString : state.addressesByGeoEncoding.searchString,
  routes : state.routes,
  routerState: state.router.routerState,
  isLoading: state.addressesByGeoEncoding.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...addressActions,
    ...databaseActions
  }, dispatch),
  routerActions:  bindActionCreators({
    ...routerActions,
  }, dispatch),
  navActions: Actions
});

// const defaultSchema = {
//   statusStyle: 'light-content',
// };

const favComp = connect(mapStateToProps,mapDispatchToProps)(Favourites);
const addrComp = connect(mapStateToProps,mapDispatchToProps)(AddressList);


class GeoEncodingApp extends Component {
  constructor(props) {
    super(props);
  }
   render(){
     return(<Router hideNavBar={true}
       onPush={(route)=>{this.props.routerActions.onPush(route.name); return true}}
       onPop={()=>{this.props.routerActions.onPop(); return true}}
       onReplace={(route)=>{this.props.routerActions.onReplace(route.name); return true}}
       assets={assets}
       >
         <Schema name="modal" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBarModal}/>
         <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar}/>
         <Schema name="tab" icon={TabBarItem} type="replace" hideNavBar={false} />
         <Schema name="withoutAnimation"/>

         <Route name="tabbar" hideNavBar={true}>
             <Router hideNavBar={true} footer={TabBar} tabBarStyle={styles.getTabBarStyle(this.props)} sceneStyle={styles.sceneStyle}
                     onPush={(route)=>{this.props.routerActions.onPush(route.name); return true}}
                     onPop={()=>{this.props.routerActions.onPop(); return true}}
                     onReplace={(route)=>{this.props.routerActions.onReplace(route.name); return true}}
             >
               <Route name="launch"  schema="tab" component={addrComp} title="Geo Encoding" tabBarItem={{icon: assets.home, title: 'Geo Encoding'}}  initial={true} />
               <Route name="favourites" schema="tab" component={favComp} title="Favourites" tabBarItem={{icon: assets.favourites, title: 'Favourites'}} />
               <Route name="video" schema="tab" component={VideoPage} title="Video" tabBarItem={{icon: assets.video, title: 'Video'}}/>
             </Router>
          </Route>
          <Route name="details" component={AddressDetails} hideNavBar={false}  title="Details" schema="modal"/>


     </Router>
   );
   }

}


// export default connect((state) => (
//   {addressesByGeoEncoding: state.addressesByGeoEncoding,
//   router: Object.assign({},state,{router:state.router}).router}), mapDispatchToProps)(GeoEncodingApp);

 export default connect(mapStateToProps, mapDispatchToProps)(GeoEncodingApp);
