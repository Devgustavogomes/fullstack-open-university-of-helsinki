import { useState } from "react"

const BlogForm = ({handleCreateBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    
    const onSubmit = async (e) =>{
        await handleCreateBlog(e,title, author, url)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                <label htmlFor="">
                    Title 
                    <input type="text" onChange={(({target}) => setTitle(target.value))} value={title}/>
                </label>
                <label htmlFor="">
                    Author 
                    <input type="text" onChange={(({target}) => setAuthor(target.value))} value={author}/>
                </label>
                <label htmlFor="">
                    URL 
                    <input type="text" onChange={(({target}) => setUrl(target.value))} value={url}/>
                </label>
                <button type="submit" className="submit">Submit</button>
            </form>
        </div>
    )
}

export default BlogForm