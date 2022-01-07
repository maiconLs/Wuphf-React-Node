import mongoose from 'mongoose'
const {connect} = mongoose

async function main(){
   await connect('mongodb://localhost:27017/Project')

   main().then()catch((err) => console.log(err))
}

export default mongoose