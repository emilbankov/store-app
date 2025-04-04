import { useState } from 'react';
import './Search.css';

interface SearchProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

export default function Search({ onSearch, placeholder = 'Търсене...' }: SearchProps) {
    const [query, setQuery] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className="search-container">
            <div className="search-wrapper">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="search-input"
                />
                <div className="search-icon">
                    <img src="/images/svg/magnifier.svg" alt="Search" />
                </div>
            </div>
        </div>
    );
}
