import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Sponsors from './pages/Sponsors';
import Models from './pages/Models';
import Colors from './pages/Colors';
import Numbers from './pages/Numbers';
import Quant from './pages/Quant';
import NewSponsor from './pages/NewSponsor';
import NewModel from './pages/NewModel';
import NewColor from './pages/NewColor';
import NewNumber from './pages/NewNumber';
import NewQuant from './pages/NewQuant';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/sponsors" component={Sponsors} />
                <Route path="/models" component={Models} />
                <Route path="/colors" component={Colors} />
                <Route path="/numbers" component={Numbers} />
                <Route path="/quant" component={Quant} />
                <Route path="/newsponsor" component={NewSponsor} />
                <Route path="/newmodel" component={NewModel} />
                <Route path="/newcolor" component={NewColor} />
                <Route path="/newnumber" component={NewNumber} />
                <Route path="/newquant" component={NewQuant} />
            </Switch>
        </BrowserRouter>
    )
}