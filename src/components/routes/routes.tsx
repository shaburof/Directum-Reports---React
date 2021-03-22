import React, { lazy, Suspense } from 'react';
import { ErrorBoundary } from '../errorBoundary/errorBoundary';
import { BackdropUI } from '../UI/backdrop/backdropUI';
import { Protected } from './protected/Protected';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Redirect
} from "react-router-dom";
import { Menu } from '../menu/menu';
import { Logout } from '../logout/logout';
import { Context } from '../../containers/App';


const Test2 = lazy(() => import('./test2'));
const Login = lazy(() => import('../login/login'));
const Appeals = lazy(() => import('../appeals/Appeals'));
const Classifier = lazy(() => import('../classifier/classifier'));
const PageNotFound = lazy(() => import('../pageNotFound/pageNotFound'));
const AppeapsList = lazy(() => import('../appealsList/appeapsList'));
const Details = lazy(() => import('../details/details'));


const Routes: React.FC = (props) => {

    let store = React.useContext(Context);

    return <Router>
        {store.isLogin ? <Menu /> : ''}
        <Box mt={5} />
        <Suspense fallback={<BackdropUI loading={true} />}>
            <Container maxWidth="lg">
                <Switch>
                    <Route exact path={'/test2'}>
                        <ErrorBoundary>
                            <Protected>
                                <Test2 />
                            </Protected>
                        </ErrorBoundary>
                    </Route>
                    <Route exact path='/login'>
                        <Login />
                    </Route>
                    <Route exact path='/classifiers'>
                        <ErrorBoundary>
                            <Protected>
                                <Classifier />
                            </Protected>
                        </ErrorBoundary>
                    </Route>
                    <Route exact path='/logout'>
                        <ErrorBoundary>
                            <Protected>
                                <Logout />
                            </Protected>
                        </ErrorBoundary>
                    </Route>
                    <Route exact path='/'>
                        <ErrorBoundary>
                            <Protected>
                                <Appeals />
                            </Protected>
                        </ErrorBoundary>
                    </Route>
                    <Route exact path='/list'>
                        <ErrorBoundary>
                            <Protected>
                                <AppeapsList />
                            </Protected>
                        </ErrorBoundary>
                    </Route>
                    <Route exact path='/details'>
                        <ErrorBoundary>
                            <Protected>
                                <Details />
                            </Protected>
                        </ErrorBoundary>
                    </Route>
                    <Route path='*' component={PageNotFound} />
                </Switch>
            </Container>
        </Suspense>
    </Router >

    // return <Appeals />
}

export { Routes };