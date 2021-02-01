import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import {Loader} from '../components/Loader';
import {LinkCard} from '../components/LinkCard';

export const DetailPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [link, setLink] = useState(null)
  // to get the link.id, we use the hook 'useParams'. The key 'id' we take from the router in 'routes.js'
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      // await request is returning a Promise
      // The 1 param - we are deciding the link (on the server side it is '/:id'). 2 param - method GET
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        // the token we are receiving through 'const {token} = useContext(AuthContext)' above
        Authorization: `Bearer ${token}`
      })
      // the 'fetched' object is gonna be a link
      setLink(fetched)
    } catch (e) {}
  }, [token, linkId, request])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      { !loading && link && <LinkCard link={link} /> }
    </>
  )
}
