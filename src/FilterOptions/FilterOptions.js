import React, { Component } from 'react';
import './FilterOptions.css';

class FilterOptions extends Component {
    render(){
        return(
            <div className='filterOptions'>
                    <label class='filter'>
                        <input type='radio' value='rating' id='filterByRating' name='option'/>
                    Rating
                    </label>
                    <label class='filter'>
                        <input type='radio' value='proximity' id='filterByProximity' name='option'/>
                    Proximity
                    </label>
            </div>

        );
    }
}
export default FilterOptions;