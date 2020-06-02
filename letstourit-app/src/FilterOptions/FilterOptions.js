import React, { Component } from 'react';
import './FilterOptions.css';

class FilterOptions extends Component {
    render(){
        return(
            <div className='filterOptions'>
                <div className='option'>
                    <label htmlFor='filterByRating'>
                        <input type='radio' value='rating' id='filterByRating'/>
                    Rating
                    </label>
                </div>
                <div className='option'>
                    <label htmlFor='filterByType'>
                        <input type='radio' value='type' id='filterByType'/>
                    Place Type
                    </label>
                </div>
                <div className='option'>
                    <label htmlFor='filterByProximity'>
                        <input type='radio' value='proximity' id='filterByProximity'/>
                    Proximity
                    </label>
                </div>

            </div>

        );
    }
}
export default FilterOptions;