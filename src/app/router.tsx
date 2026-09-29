import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import { Catalogue } from '../pages/Catalogue'
import { Family } from '../pages/Family'
import { Home } from '../pages/Home'
import { Quote } from '../pages/Quote'
import { QuoteDetails } from '../pages/QuoteDetails'
import { QuoteReceived } from '../pages/QuoteReceived'
import { NotFound, Resources } from '../pages/Resources'
import { Standards } from '../pages/Standards'
import { Layout } from './Layout'

const Founder = lazy(() => import('../pages/Founder'))
const Since1942 = lazy(() => import('../pages/Since1942'))
const Tokens = lazy(() => import('../pages/Tokens'))

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/catalogue', element: <Catalogue /> },
      { path: '/catalogue/:group', element: <Catalogue /> },
      { path: '/catalogue/:group/:family', element: <Family /> },
      { path: '/quote', element: <Quote /> },
      { path: '/quote/details', element: <QuoteDetails /> },
      { path: '/quote/received', element: <QuoteReceived /> },
      { path: '/founder', element: <Founder /> },
      { path: '/since-1942', element: <Since1942 /> },
      { path: '/standards', element: <Standards /> },
      { path: '/resources', element: <Resources /> },
      ...(import.meta.env.DEV ? [{ path: '/_tokens', element: <Tokens /> }] : []),
      { path: '*', element: <NotFound /> },
    ],
  },
])
