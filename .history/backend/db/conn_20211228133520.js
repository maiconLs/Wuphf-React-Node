import mongoose from 'mongoose'
import { connect } from 'mongoose'

async function main(){
   await connect('mongodv')
}