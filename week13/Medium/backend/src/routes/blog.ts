import {Hono} from 'hono';
import { verify } from 'hono/jwt';
//adding prisma client
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { JWTPayload } from 'hono/utils/jwt/types';
import { createBlogInput,updateBlogInput} from '@100xdevs/medium-common';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: JWTPayload["id"];
    }
}>();


//writing a middleware because all of these should be authenticated.

//c variable is said to be a context variable.
//whenever a request comes in, all the thing related to that context,be it request header,be it body,how to send back header to the user,body to the user all these things are stored in context variable
//in hono documentation in context part u can learn about it in set()/get() that is one way to pass data from the middleware over to the route handler that exactly we want ,we want our middleware to extract the
//user id and pass the  userid to the actual route
blogRouter.use("/*",async (c,next) => {
    //extract the user id from the token and pass it down to the route handler.
    const authHeader = c.req.header("authorization") || ""; //this is how u can access the auth header,the way u tell ur backend that u loged in is u ssend paired token like this Bearer token, aisa b ho skta h request krne k baad response aa jaye to wo string type ho jayega pr aagr ni aaya to undefined type ho jata so to avoid that we use || "" ki ni b hua tb b string hi jaye .
    try{
        const user = await verify(authHeader,c.env.JWT_SECRET);
    if(user){
        c.set("userId",user.id);  //variables me userId ko set kr diye jiska type JWTPayload["id"] h to type ko define krne k lye upr variables me lkha
        await next();
    }
    else{
        c.status(403);
        return c.json({
            message : "you are not logged in"
        })
    }
    }
    catch(e) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
    
});


//these are the routes for different end points

// app.post('/api/v1/blogs',(c)=>{
//     return c.text('blogs route')
//   })
    


  blogRouter.post('/',async(c)=>{
    //create a blog
    const body = await c.req.json();
    
    const {success} = createBlogInput.safeParse(body);
      if(!success){
          c.status(411);
          return c.json({error: "invalid input"})
      }
    //getting the user id from the context variable
    const authorId = c.get("userId");;

    //prisma
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: Number(authorId), //how can i extract the author id,this extraction will happen in the middleware,the middleware is the place where u take the token from the user and actually extract the userid from it and pass it from the middlewate to actually route handlers here it .post
      }
    })
    return c.json({
        id: blog.id
    })
  })
  

  //for updating the post...

  blogRouter.put('/',async(c) =>{
    const body = await c.req.json();

    //zod validation
    const {success} = updateBlogInput.safeParse(body);
      if(!success){
          c.status(411);
          return c.json({error: "invalid input"})
      }
    //prisma client
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.blog.update({
        where: {
            id : body.id
        },
        data : {
            title: body.title,
            content: body.content
        }
        })

    return c.json({
        id: blog.id
    })
  })

  //getting all blogs //todo  : add pagination
  blogRouter.get('/bulk',async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.blog.findMany();
    return c.json({
        blogs
    })
  })
  
  //for fetching the blogs 
  blogRouter.get('/:id',async(c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const blogs = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            }
        })
        return c.json({
            blogs
        })
    }catch(e){
        c.status(411);
        return c.json({
            message: "Error while fetching blog post"
        })
    }
  })

  