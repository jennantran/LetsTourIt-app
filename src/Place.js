import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Place(props) {
  return (
    <div className='Place'>
        <h2> {props.name} </h2>
        <p>{props.rating}</p> 
            <p>{props.address} </p>
            <i class="fas fa-heart"
                onClick={props.onClick}
            ></i>
    </div>

  )
}