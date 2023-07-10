import FeaturedPost from '../components/FeaturePost'
import { Grid, Typography } from '@mui/material'

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text'
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text'
  }
]

const News = () => {
  return (
    <>
      <Typography
        variant='h4'
        align='center'
        gutterBottom
        sx={{ color: 'var(--primary-color)', fontWeight: '600', margin: '20px 0' }}
      >
        News
      </Typography>

      <Grid
        container
        xs={12}
        sx={{ margin: '20px 0', minHeight: '78vh', display: 'flex', justifyContent: 'space-evenly' }}
      >
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.date} post={post} />
        ))}
      </Grid>
    </>
  )
}

export default News
