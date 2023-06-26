import React, {useEffect, useState} from 'react';
import Collection from "./components/Collection/Collection";
import {TPhoto} from "./types";

const App = () => {
    const [searchValue, setSearchValue] = useState('');
    const [collections, setCollections] = useState<TPhoto[]>([]);

    useEffect(() => {
        fetch('https://6499634679fbe9bcf83f2512.mockapi.io/photo_collections')
            .then((res) => res.json())
            .then((json) => {
                setCollections(json)
            })
            .catch((err) => {
                console.warn(err);
                alert('Connection error');
            });
    }, []);

    return (
        <div className="App">
            <h1>My photo collection</h1>
            <div className="top">
                <ul className="tags">
                    <li className="active">All</li>
                    <li>Mountains</li>
                    <li>Sea</li>
                    <li>Architecture</li>
                    <li>Cities</li>
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
                    collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((item, index) => (
                            <Collection
                                key={index}
                                name={item.name}
                                images={item.photos}
                            />
                        ))
                }
            </div>
            <ul className="pagination">
                <li>1</li>
                <li className="active">2</li>
                <li>3</li>
            </ul>
        </div>
    )
};

export default App;
