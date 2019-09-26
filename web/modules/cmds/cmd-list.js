import React from 'react';
import { Link } from 'react-router-dom';
import Lock from './lock';

function CmdList({ commands }) {
    return (
        <div className="cmd-list">
            {commands.map((command) => {
                return <div key={command.name}>
                    <Link
                        to={`/cmds/${encodeURIComponent(command.name)}`}
                    >
                        {command.name}
                    </Link>
                    {command.starred && <span className="star"> ★</span>}
                    {' '}
                    {command.locked && <Lock />}
                </div>;
            })}
        </div>
    );
}

export default CmdList;
