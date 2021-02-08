import React from 'react';
import { Sidebar } from './Sidebar.js';
import { Tasks } from '../Tasks';

export const Content = () => (
    <section>
        <Sidebar />
        <Tasks />
    </section>
)
