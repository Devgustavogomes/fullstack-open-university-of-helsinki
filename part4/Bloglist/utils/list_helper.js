const listOfBlogs = [
  {
    title: 'React Patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://example.com/dijkstra',
    likes: 5
  }
]



const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlogs = (blogs) => {
  const favorite = {
    title : '',
    author: '',
    likes: 0
  }
  blogs.forEach(blog => {
    if(blog.likes >= favorite.likes){
      favorite.title = blog.title
      favorite.author = blog.author
      favorite.likes = blog.likes
    }
  })

  return favorite
}

const mostBlogs = (blogs) => {
  const authors = new Map()
  blogs.forEach(blog => {
    if(!authors.has(blog.author)){
      authors.set(blog.author, 1)
    }else{
      let count = authors.get(blog.author)
      authors.set(blog.author, count + 1)
    }
  })
  const result = {
    author: '',
    blogs: 0
  }
  for (let [author, count] of authors) {
    if(count > result.blogs){
      result.author = author
      result.blogs = count
    }
  }
  return result
}

const mostLikes = (blogs) => {
  const authors = new Map()
  blogs.forEach(blog => {
    if(!authors.has(blog.author)){
      let likes = blog.likes
      authors.set(blog.author, likes)
    }else{
      let count = authors.get(blog.author)
      let likes = blog.likes
      authors.set(blog.author, count + likes)
    }
  })
  const result = {
    author: '',
    likes: 0
  }
  for (let [author, likes] of authors) {
    if(likes > result.likes){
      result.author = author
      result.likes = likes
    }
  }
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes,
  listOfBlogs
}
