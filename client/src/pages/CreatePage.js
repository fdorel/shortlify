import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import {useHistory} from 'react-router-dom';

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  // receiving the object {request} from our custom hook 'useHttp()'
  const {request} = useHttp();
  const [link, setLink] = useState('');

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  // once we use the operator 'await', we should make the function 'pressHandler' asynchronous
  const pressHandler = async event => {
    // first we check if user clicked on 'Enter', then we gonna ask the request
    if (event.key === 'Enter') {
      try {

        // in the field 'data' we are gonna receive an object which has a key 'link' inside of which the information about the link is saved
        const data = await request('/api/link/generate', 'POST', {from: link}, {
          Authorization: `Bearer ${auth.token}`
        })
        history.push(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '3rem'}}>
        <div className="input-field">
          <input
            placeholder="Enter the link..."
            id="link"
            type="text"
            value={link}
            // here we ear writing an inline function
            onChange={e => setLink(e.target.value)}
            // if we press Enter, then we create the link
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Write the link here</label>
        </div>
      </div>
    </div>
  )
}