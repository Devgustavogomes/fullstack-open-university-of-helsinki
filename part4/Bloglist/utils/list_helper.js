const listOfBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
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
