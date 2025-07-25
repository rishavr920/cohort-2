import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    //try to fetch blog from backend way to do it
    // store blogs in state
    // stote directly here
    // store it in context variable
    // create our own custom hook called useBlogs
    // if we have to use Blogs in multiple places then we can use recoil but here we use cutom hook

    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>
            loading...
        </div>
    }
    return (
        <div>
            <Appbar/>
            <div className="flex justify-center">
                <div className="max-w-xl">
                    <BlogCard 
                        authorName={"rishav"} 
                        title={" an ugly single page website makes $5000 a month without affiliatHowe marketing" }
                        content={"an ugly single page website makes $5000 a month without affiliatHowe marketingan ugly single page website makes $5000 a month without affiliatHow marketingan ugly single page website makes $5000 a month without affiliatHowe marketing"}
                        publishedDate={"17-12-01" }
                    />
                    <BlogCard 
                        authorName={"rishav"} 
                        title={" an ugly single page website makes $5000 a month without affiliatHowe marketing" }
                        content={"an ugly single page website makes $5000 a month without affiliatHowe marketingan ugly single page website makes $5000 a month without affiliatHow marketingan ugly single page website makes $5000 a month without affiliatHowe marketing"}
                        publishedDate={"17-12-01" }
                    />
                    <BlogCard 
                        authorName={"rishav"} 
                        title={" an ugly single page website makes $5000 a month without affiliatHowe marketing" }
                        content={"an ugly single page website makes $5000 a month without affiliatHowe marketingan ugly single page website makes $5000 a month without affiliatHow marketingan ugly single page website makes $5000 a month without affiliatHowe marketing"}
                        publishedDate={"17-12-01" }
                    />
                </div>
            </div>
        </div>
    ) 
}