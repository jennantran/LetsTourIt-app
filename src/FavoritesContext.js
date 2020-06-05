import React from 'react'

const FavoritesContext = React.createContext({
    favorites: [],
    addFavorites: () => {}
});

export default FavoritesContext;