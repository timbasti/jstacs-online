import {combineReducers} from '@reduxjs/toolkit';

import {reducer as applicationsReducer} from '../api/applications/slice';
import {drawerReducer} from '../api/drawer/slice';
import {filesReducer} from '../api/files/slice';
import {reducer as routeReducer} from '../api/route/slice';
import {testReducer} from '../api/test/slice';
import {themeReducer} from '../api/theme/slice';
import {toolsReducer} from '../api/tools/slice';
import {reducer as userReducer} from '../api/users/slice';

export const reducer = combineReducers({
    applications: applicationsReducer,
    drawer: drawerReducer,
    files: filesReducer,
    route: routeReducer,
    test: testReducer,
    theme: themeReducer,
    tools: toolsReducer,
    user: userReducer
});
