import React, {useEffect, useState} from 'react';
import Collection from "./components/Collection/Collection";
import {TPhoto} from "./types";

const cats = [
    {"name": "All"},
    {"name": "Mountains"},
    {"name": "Sea"},
    {"name": "Architecture"},
    {"name": "Cities"}
]

const App = () => {
    const [categoryId, setCategoryId] = useState(0);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [collections, setCollections] = useState<TPhoto[]>([]);

    useEffect(() => {
        setIsLoading(true);

        const category = categoryId ? `category=${categoryId}` : '';

        fetch(`https://6499634679fbe9bcf83f2512.mockapi.io/photo_collections?page=${page}&limit=3&${category}`)
            .then((res) => res.json())
            .then((json) => {
                setCollections(json)
            })
            .catch((err) => {
                console.warn(err);
                alert('Connection error');
            })
            .finally(() => setIsLoading(false));
    }, [categoryId, page]);

    return (
        <div className="App">
            <h1>My photo collection</h1>
            <div className="top">
                <ul className="tags">
                    {
                        cats.map((item, index) => (
                            <li
                                onClick={() => setCategoryId(index)}
                                className={categoryId === index ? 'active' : ''}
                                key={item.name}
                            >
                                {item.name}
                            </li>
                        ))
                    }
                </ul>
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="search-input"
                    placeholder="Search by name"
                />
            </div>
            <div className="content">
                {
                    isLoading ? <h2>Loading...</h2>
                        :
                        collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((item, index) => (
                                <Collection
                                    key={index}
                                    name={item.name}
                                    photos={item.photos}
                                />
                            ))
                }
            </div>
            <ul className="pagination">
                {
                    [...Array(5)].map((_, index) => (
                        <li
                            key={index}
                            onClick={() => setPage(index + 1)}
                            className={page === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </li>
                    ))}
            </ul>
        </div>
    )
};

export default App;
