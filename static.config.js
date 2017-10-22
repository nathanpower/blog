/* eslint-disable react/no-danger */
import axios from 'axios';
import React, { Component } from 'react';
import { renderStatic } from 'glamor/server';
//
import withCssLoader from 'react-static/lib/plugins/withCssLoader';
import withFileLoader from 'react-static/lib/plugins/withFileLoader';
import endpoint from './endpoint.config';

export default {
  getRoutes: async () => {
    const code = endpoint && endpoint.code || '';
    const { data: posts } = await axios.get(`https://github-blog-content-parser.azurewebsites.net/api/normalize-blog-content?code=${code}`);

    return [
      {
        path: '/',
        component: 'src/containers/Home'
      },
      {
        path: '/about',
        component: 'src/containers/About'
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getProps: () => ({
          posts
        }),
        children: posts.map(post => ({
          path: `/post/${post.attributes.slug}`,
          component: 'src/containers/Post',
          getProps: () => ({
            post
          })
        }))
      },
      {
        is404: true,
        component: 'src/containers/404'
      }
    ];
  },
  postRenderMeta: async html => ({
    glamorousData: renderStatic(() => html)
  }),
  Html: class CustomHtml extends Component {
    render () {
      const {
        Html,
        Head,
        Body,
        children,
        staticMeta: { glamorousData: { css } = {} } = {}
      } = this.props;

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style dangerouslySetInnerHTML={{ __html: css }} />
          </Head>
          <Body>{children}</Body>
        </Html>
      );
    }
  },
  webpack: [withFileLoader, withCssLoader]
};
