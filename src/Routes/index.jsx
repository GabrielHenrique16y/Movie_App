import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MyRoute from './MyRoute';

import Home from '../pages/Home';
import Movie from '../pages/Movie';
import Page404 from '../pages/Page404';
import Series from '../pages/Series';
import Serie from '../pages/Serie';
import Actor from '../pages/Actor';
import Login from '../pages/Login';
import WatchList from '../pages/WatchList';
import Register from '../pages/Register';
import List from '../pages/Users/List';

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <MyRoute IsClosed={false}>
                        <Home />
                    </MyRoute>
                }
            />

            <Route
                path="movie/:id"
                element={
                    <MyRoute IsClosed={false}>
                        <Movie />
                    </MyRoute>
                }
            />

            <Route
                path="/series"
                element={
                    <MyRoute IsClosed={false}>
                        <Series />
                    </MyRoute>
                }
            />

            <Route
                path="serie/:id"
                element={
                    <MyRoute IsClosed={false}>
                        <Serie />
                    </MyRoute>
                }
            />

            <Route
                path="actor/:id"
                element={
                    <MyRoute IsClosed={false}>
                        <Actor />
                    </MyRoute>
                }
            />

            <Route
                path="login/"
                element={
                    <MyRoute IsClosed={false}>
                        <Login />
                    </MyRoute>
                }
            />

            <Route
                path="register/"
                element={
                    <MyRoute IsClosed={false}>
                        <Register />
                    </MyRoute>
                }
            />

            <Route
                path="watchList/:name?"
                element={
                    <MyRoute IsClosed={true}>
                        <WatchList />
                    </MyRoute>
                }
            />

            <Route
                path="users/"
                element={
                    <MyRoute IsClosed={false}>
                        <List />
                    </MyRoute>
                }
            />
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}
