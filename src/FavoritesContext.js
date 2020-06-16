import React from 'react'

const FavoritesContext = React.createContext({
    favorites: [],
    addFavorite: () => {},
    deleteFavorite: () => {},
    handlePostAuthenticate: () => {},
    handleLogoutClick: () => {},
    clearFavorites: () => {},
    user_id: '',
});

export default FavoritesContext;