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

export async function createQuery(data){
    try{
        const newQuery = await queriesApi.create(data)
        return newQuery
    } catch(err){
        console.log(err)
        return err
    }
}

export async function getQuery(id){
    try{
        const query = await queriesApi.detail(id)
        return query
    } catch(err){
        console.log(err)
        throw new Error(err)
    }
}

export async function deleteQuery(id){
    try{   
        const deletedQuery = await queriesApi.destroy(id)
        console.log(deletedQuery)
        return deletedQuery
    } catch(err){
        console.log(err)
        throw new Error(err)
    }
}