//import loadable from '@loadable/component';
import React, {Suspense, lazy} from 'react';
import {BrowserRouter, Route, Switch, HashRouter} from 'react-router-dom';

// import MyTimestamp from './MyTimestamp';
// import MyBase64Image from './MyBase64Image';
// import MyFileSharer from './MyFileSharer';

// const MyTimestamp = asyncComponent(() => import('./MyTimestamp'));
// const MyBase64Image = asyncComponent(() => import('./MyBase64Image'));
// const MyFileSharer = asyncComponent(() => import('./MyFileSharer'));

// const MyTimestamp = loadable(() => import('./MyTimestamp'));
// const MyBase64Image = loadable(() => import('./MyBase64Image'));
// const MyFileSharer = loadable(() => import('./MyFileSharer'));

const MyTimestamp = lazy(() => import('./components/MyTimestamp'));
const MyBase64Image = lazy(() => import('./components/MyBase64Image'));
const MyFileSharer = lazy(() => import('./components/MyFileSharer'));
const MyFileReceiver = lazy(() => import('./components/MyFileReceiver'));
const MyNotFound = lazy(() => import('./components/MyNotFound'));

const Routes = () => (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Suspense fallback={<div>Loading...</div>}>

            <Switch>
                <Route exact path='/' component={MyTimestamp}></Route>
                <Route exact path='/base64image' component={MyBase64Image}></Route>
                <Route exact path='/filesharer' component={MyFileSharer}></Route>
                <Route exact path='/filesharer/:id' component={MyFileReceiver}></Route>
                <Route component={MyNotFound}></Route>
            </Switch>

        </Suspense>
    </BrowserRouter>
);

export default Routes;