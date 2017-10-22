/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { getRouteProps, Link } from 'react-static';
//

export default getRouteProps(({ posts }) => (
  <div>
    <h1>It's blog time.</h1>
    <br />
    All Posts:
    <ul>
      {posts.map(post => (
        <li key={post.attributes.slug}>
          <Link to={`/blog/post/${post.attributes.slug}/`}>{post.attributes.title}</Link>
        </li>
      ))}
    </ul>
  </div>
));
