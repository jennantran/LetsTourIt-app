import React from 'react'

const FavoritesContext = React.createContext({
    favorites: [],
    addFavorite: () => {},
    deleteFavorite: () => {},
    handlePostAuthenticate: () => {},
    handleLogoutClick: () => {},
    clearFavorites: () => {}
});

export default FavoritesContext;