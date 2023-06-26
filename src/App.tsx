import React, {useEffect, useState} from 'react';
import Collection from "./components/Collection/Collection";
import {TPhoto} from "./types";

const App = () => {
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
          <h1>Моя коллекция фотографий</h1>
          <div className="top">
              <ul className="tags">
                  <li className="active">Все</li>
                  <li>Горы</li>
                  <li>Море</li>
                  <li>Архитектура</li>
                  <li>Города</li>
              </ul>
              <input className="search-input" placeholder="Поиск по названию" />
          </div>
          <div className="content">
              {
                  collections.map((item, index) => (
                      <Collection
                          key={item.name}
                          name="Путешествие по миру"
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
