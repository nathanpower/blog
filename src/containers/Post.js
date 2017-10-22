import React from 'react';
import { getRouteProps, Link } from 'react-static';
import markup from '../markup';
//

export default getRouteProps(({ post }) => (
  <div>
    <Link to="/blog/">{'<'} Back</Link>
    <br />
    <div dangerouslySetInnerHTML={ { __html: markup(post.body) } } />
  </div>
));
