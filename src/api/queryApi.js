const BASE_URL = `${process.env.REACT_APP_BASE_URL}`

export const index = async () => {
    try{
        const response = await fetch(BASE_URL, {method: 'GET'})
        if(response.ok){
            return response.json()
        } else{
            throw new Error('Invalid request')
        }
    } catch(err){
        console.log(err)
        return err
    }
}