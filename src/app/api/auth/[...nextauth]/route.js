import NextAuth from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import { redirect } from "next/dist/server/api-utils";

export const handler =  NextAuth({
providers:[
    CredentialsProvider ({
        name:'credentials',
        credentials:{
            email:{label:'email',type:'text'},
            password:{label:'password',type:'password'},
        },
        async authorize(credentials,req){
            try{
                const res=await fetch('http://localhost:4000/api/signin',{
                    method:'POST',
                    headers: { 'Content-Type': 'application/json','Accept':"application/json" },
                    body:JSON.stringify({
                        email:credentials.email,
                        password:credentials.password
                    })
                })
                
                if (!res.ok) {
                    const errBody = await res.text();
                    console.error('Login failed:', errBody);
                    return null;
                  }
                const user=await res.json()
                if(res.ok){
                    console.log(user)
                    return user
                }
                return null
            }catch(err){
                console.log(err)
                return null
            }
        }
    })
],
session:{
    strategy:"jwt"
},
pages:{
    signIn:'auth/signin'
},
callbacks:{
    async jwt({token,user}){
        if(user){
            token.id=user.id
            token.email=user.email
            token.name=user.name
        }
        return token
    },
    async session({session,token}){
        session.user.id=token.id
        session.user.email = token.email;
        session.user.name = token.name;
        return session;
    }
},

})

export { handler as GET, handler as POST };