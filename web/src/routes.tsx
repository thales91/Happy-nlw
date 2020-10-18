import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import LandingPage from './pages/LandingPage'
import OrphanagesMap from './pages/OrphanagesMap'
import Orphanage from './pages/Orphanage'
import CreateOrphanage from './pages/CreateOrphanage'

function Routes() {
    return(
        <BrowserRouter>
        <Switch>
        <Route path="/" exact component={LandingPage}></Route>
        <Route path="/app" component={OrphanagesMap}></Route>
        <Route path="/orphanages/create" exact component={CreateOrphanage}></Route>
        <Route path="/orphanages/:id" component={Orphanage}></Route>
        </Switch>
        </BrowserRouter>
    );
}

export default Routes