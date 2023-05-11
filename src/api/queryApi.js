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

export const create = async (data) => {
    try{
        console.log(data)
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
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