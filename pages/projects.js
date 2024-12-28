import { styled } from '../stitches.config'
import Head from 'next/head'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import { getAllPosts, getPostBySlug } from '../lib/blog'
import ListItem from '../components/ListItem'
import FeaturedArticle from '../components/FeaturedArticle'
import { ListGroup } from '../components/ListGroup'
import { AnimateSharedLayout } from 'framer-motion'

export async function getStaticProps() {
  const allPosts = getAllPosts(['date', 'skip', 'slug', 'title'])

  const featuredParams = [
    'date',
    'slug',
    'title',
    'image',
    'content',
    'description',
  ]

  const featuredPosts = [
    getPostBySlug('lurelore', featuredParams),
    getPostBySlug('urbanstylist', featuredParams),
    getPostBySlug('personalvault', featuredParams),
  ]

  return {
    props: {
      title: 'Projects // Chen (David) Zhuang',
      tagline: 'Projects',
      image: '/static/images/articles-bw.jpg',
      primaryColor: 'pink',
      secondaryColor: 'purple',
      featuredPosts,
    },
  }
}

function Articles(props) {
  const renderFeatured = () => {
    return props.featuredPosts.map((post, index) => {
      return (
        <FeaturedArticle
          key={index}
          index={index}
          href={`/${post.slug}/`}
          title={post.title}
          description={post.description}
          image={post.image}
          stats={post.stats}
          content={post.content}
        />
      )
    })
  }

  const renderAll = () => {
    return props.allPosts.map((post, index) => {
      if (!post.skip) {
        return (
          <ListItem
            key={index}
            index={index}
            href={`/${post.slug}/`}
            title={post.title}
            date={post.date}
          />
        )
      }
    })
  }

  const { title, image } = props
  const description = `Here are some of the projects I've been extensively working on. Click on one of the Featured Projects to read more about them. The rest of my projects can be found on my Github: https://github.com/davidz299. The code to all of my projects is also on my Github.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://chendavidzhuang.com/projects" property="og:url" />
        <meta content={`https://chendavidzhuang.com${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>Featured Projects</h2>
        <FeaturedArticles>{renderFeatured()}</FeaturedArticles>

        {/* <h2>All Articles</h2>
        <ListGroup>{renderAll()}</ListGroup> */}
      </AnimateSharedLayout>
    </>
  )
}

const FeaturedArticles = styled('div', {
  margin: '5px 0 0 -20px',
  '@bp2': { display: 'flex', justifyContent: 'space-between' },
})

Articles.Layout = Base

export default Articles
