import React from 'react';
import {Link} from 'react-router-dom';

export const LinksList = ({ links }) => {
  if (!links.length) {
    // no links yet, otherwise we will show the table as true
    return <p className="center">No links yet</p>
  }

  return (
    <div className="table">
      <div className="rowN">
        <div className="cell">Number</div>
        <div className="cell">Original Link</div>
        <div className="cell">Shortened Link</div>
        <div className="cell">Open Link</div>
      </div>

      <div className="rowN">
      { links.map((link, index) => {
        return (
          <div key={link._id}>
            <div className="cell"><strong>{index+1}</strong></div>
            <div className="cell"><strong>{link.from}</strong></div>
            <div className="cell"><strong>{link.to}</strong></div>
            <div className="cell"><strong>
              <Link to={`/detail/${link._id}`}>Open Link</Link></strong>
            </div>
          </div>
        )
      }) }
      </div>
    </div>
  )
}