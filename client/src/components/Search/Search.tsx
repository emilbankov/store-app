import { useState } from 'react';
import './Search.css';

interface Product {
    id: number;
    name: string;
    price: number;
    category: 'fruit' | 'vegetable';
    image: string;
    stock: number;
}

interface SearchProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    products?: Product[];
}

export default function Search({ onSearch, placeholder = 'Търсене...' }: SearchProps) {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-container">
            <div className="search-wrapper">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="search-input"
                />
                {query && (
                    <div className="clear-icon" onClick={handleClear}>
                        <img src="/images/svg/clear.svg" alt="Clear" />
                    </div>
                )}
                <div className="search-icon" onClick={handleSearch}>
                    <img src="/images/svg/magnifier.svg" alt="Search" />
                </div>
            </div>
        </div>
    );
}
