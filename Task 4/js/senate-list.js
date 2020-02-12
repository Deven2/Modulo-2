let data;
let url = "https://api.propublica.org/congress/v1/113/senate/members.json"
let init = {
    method: 'GET',
    headers:{
        'X-API-Key': 'mqgiryUXaOUZNPgJyIpeCP8U45XhSE4oBsi0h7Yb'
    }
}


async function getList (url, init){
    await fetch(url, init)
    .then(function(res){
        if(res.ok){
            return res.json();
        }
        else{
            throw new Error (res.status)
        }
    })

    .then(function(json){
        data = json;
    })

    .catch(function(error){
        console.log('No se pudo cargar la lista de miembros')
    })
};
