import React from 'react'

const FavoritesContext = React.createContext({
    favorites: [],
    addFavorite: () => {},
    deleteFavorite: () => {}
});

export default FavoritesContext;