import React from 'react';

export const LinkCard = ({ link }) => {
  return (
    <>
      <h2>Link</h2>

      <p>Your link is : <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
      <p>Your link comes from : <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
      <p>Number of clicks per link : <strong>{link.clicks}</strong></p>
      <p>The date of creation : {new Date(link.date).toLocaleDateString()}</p>
    </>
  );
}