import React from 'react';
import { Router, Switch } from 'react-router-dom';
import './App.scss';
import { NavigationScheme } from './common/navigation/scheme';
import { history } from './common/navigation/history';
import { IocProvider } from './common/ioc/ioc-provider';
import { AppThemeProvider } from './common/theme';
import { DatePickersProvider } from './common/components/form-fields/date-pickers.provider';
import 'mobx-react/batchingForReactDom';

function App() {
  return (
    <IocProvider>
      <AppThemeProvider>
        <DatePickersProvider>
          <Router history={history}>
            <Switch>
              <NavigationScheme />
            </Switch>
          </Router>
        </DatePickersProvider>
      </AppThemeProvider>
    </IocProvider>
  );
}

export default App;
