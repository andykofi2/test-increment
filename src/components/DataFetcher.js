import React, { useState, useEffect} from 'react';

const DataFetcher = () => {

    const [userName, setUserName] = useState('Loading...');

    useEffect(() => {
        // Simulate an API call
        fetch('https://api.example.com/user/1')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Assume API returns { name: "..." }
                setUserName(data.name);
            })
            .catch(() => {
                setUserName('Failed to load user.');
            });
    }, []);

    return (
        <div>
            <h2>API Data Test</h2>
            <p data-testid="user-name">User: {userName}</p>
            <p data-testid="user-name">User: {userName}</p>
        </div>
    );
};

export default DataFetcher;