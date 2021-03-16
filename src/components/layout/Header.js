import React from 'react';
import {FaUserSecret} from 'react-icons/fa';

export const Header = () => {
    return (
        <header className="header" data-testid="header">
            <nav>
                <div className="logo">
                    <img src="/images/logo.png" alt="A.L.F.R.E.D." />
                </div>
                <div className="settings">
                    <ul>
                        <li data-testid="quick-add-task-action" className="settings__add">+</li>
                        <li data-testid="dark-mode-action" className="settings__darkmode">
                            <FaUserSecret />
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}