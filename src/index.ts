import {ApolloServer,gql} from "apollo-server";
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";
import {users,kills} from "../fakedb.js";
const typeDefs = gql`
    type Query{
        Myusers : [UserListing]
        userbyid(id:ID!):UserListing
        Myuser(age:Int!):[UserListing]
        userkills : [KillCount]
    }

    type UserListing{
        id : ID
        firstname : String
        lastname : String
        age: Int
        department : String
        kills : [KillCount]
    }

    type KillCount{
        agent : ID
        kill_count : Int
    }

`
const resolvers = {
    Query : {
        Myusers:()=> users,
        userbyid:(parent,arg)=>users.find(user=>user.id == arg.id),
        Myuser:(parent,arg) => users.filter(user=>user.age == arg.age),
        userkills:()=>kills
    },
    UserListing :{
        kills :(ul)=>kills.filter(kills=>kills.agent == ul.id)
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground
    ]
})

server.listen().then(({url})=>{
    console.log(`server is Running on ${url}`); 
})