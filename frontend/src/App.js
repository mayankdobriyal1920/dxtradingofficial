import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import './theme/css/style.css';
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import {isLoginUser} from "./middleware/auth";

setupIonicReact();

const App=() => {
  const DashboardEntryPage = ()=>{
    const PrivateRoutes = ()=>{
        return (
            <IonRouterOutlet>
              <Route path="/dashboard/home"  component={DashboardPage} />
              <Redirect exact from="/dashboard" to="/dashboard/home" />
            </IonRouterOutlet>
        )
    };

    const PublicRoutes = ()=> {
        return (
            <IonRouterOutlet>
                <Route path="/dashboard/login" component={LoginPage}/>
                <Redirect exact from="/dashboard" to="/dashboard/login"/>
            </IonRouterOutlet>
        );
    }
    return (
       <>
           {(isLoginUser()) ?
               <PrivateRoutes/>
               :
               <PublicRoutes/>
           }
       </>
    )
  }
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/home" exact={true} component={Home} />
          <Route path="/home/:id/:email/:subscription" exact={true} component={Home} />
          <Route path="/dashboard" component={DashboardEntryPage} />
          <Redirect exact from="/" to="/home" />
          <Route render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
