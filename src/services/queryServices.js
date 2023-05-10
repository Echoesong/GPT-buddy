import * as queriesApi from '../api/queryApi'

export async function getQueries(){
    try{
        const data = await queriesApi.index()
        return data
    }catch(err){
        console.log(err)
        return err
    }
}