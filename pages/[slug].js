import Head from 'next/head'
import { ArticleJsonLd } from 'next-seo'
import Blogpost from '../layouts/Blogpost'
import ErrorMessage from '../components/ErrorMessage'
import { getPostBySlug, getAllPosts, convertMarkdownToHtml } from '../lib/blog'
import Image from 'next/image'

function Post(props) {
  if (props.errorCode) {
    return <ErrorMessage code={props.errorCode} />
  }

  const title = `${props.title} // Chen (David) Zhuang`
  const description = props.description || ''
  const url = `https://chendavidzhuang.com/${props.slug}`
  const date = new Date(props.date).toISOString()
  const image = props.image
    ? `https://chendavidzhuang.com${props.image}`
    : 'https://chendavidzhuang.com/static/images/home-opt.jpg'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content={url} property="og:url" />
        <meta content={image} property="og:image" />

        {props.canonical_url && (
          <link rel="canonical" href={props.canonical_url} />
        )}
      </Head>

      <ArticleJsonLd
        authorName="Chen (David) Zhuang"
        type="Blog"
        url={url}
        title={title}
        images={[image]}
        datePublished={date}
        dateModified={date}
        description={props.description}
      />

      <div dangerouslySetInnerHTML={{ __html: props.content }} />
    </>
  )
}

export async function getStaticProps({ params }) {
  try {
    const post = getPostBySlug(params.slug, [
      'canonical_url',
      'content',
      'date',
      'description',
      'image',
      'lang',
      'slug',
      'title',
    ])

    const content = await convertMarkdownToHtml(post.content || '')

    const isProd = process.env.NODE_ENV === 'production'
    const base = isProd ? 'https://chendavidzhuang.com' : 'http://localhost:3000'

    // if (isProd) {
    //   const viewsReq = await fetch(`${base}/api/views/${params.slug}`)
    //   const viewsRes = await viewsReq.json()

    //   post.views = new Intl.NumberFormat().format(viewsRes.views || 0)
    // }

    return {
      props: {
        ...post,
        content,
      },
      revalidate: 60,
    }
  } 
  catch (e) {
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: 'blocking',
  }
}

Post.Layout = Blogpost

export default Post
