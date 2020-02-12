let data;
let url;

if(document.querySelector("#senators")){
	url = "https://api.propublica.org/congress/v1/113/senate/members.json"
}
else{
	url = "https://api.propublica.org/congress/v1/113/house/members.json"
}

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

	loadList();
};

getList(url,init);

function loadList(){
	var members=[] 
	for(i = 0; i < data.results[0].members.length; i++){
		members.push(data.results[0].members[i])
	};

	// Creo las opciones del select
	let state_array = [];
	members.forEach(members =>{
		if (state_array.indexOf(members.state) == -1) {
			state_array.push(members.state)
		}
	});

	state_array.sort();

	for (let i = 0; i<state_array.length; i++){
		document.querySelector("select").innerHTML += '<option value="' + state_array[i] + '">' + (state_array[i] + '') + '</option>';
	}

	// Filtro por checkbox y estado
	function filterByCheckbox(){
		let checks = document.getElementsByClassName("party");
		// Limpio tabla
		document.querySelector("tbody").innerHTML = '';
		// Guardo valor actual del select
		let filterValue = document.querySelector("select").value;

		for (let i = 0; i<checks.length; i++){
			if (checks[i].checked){
				members.filter(e => checks[i].value == e.party && (filterValue == e.state || filterValue == 'none')).forEach(members =>{
				let full_name = members.last_name + ' ' + members.first_name + ' ' + (members.middle_name ? members.middle_name : '');
				document.querySelector("tbody").innerHTML += '<tr><td>' + (members.url != '' ? '<a href= "' + members.url + '" >' + full_name + '</a>'  : full_name) + '</td><td>' + members.party + '</td><td>' + members.state + '</td><td>' + members.seniority + '</td><td>' + members.votes_with_party_pct + '%</td></tr>';
			})};
		}
	}

	document.getElementById("checkR").addEventListener("click", filterByCheckbox);
	document.getElementById("checkD").addEventListener("click", filterByCheckbox);
	document.getElementById("checkI").addEventListener("click", filterByCheckbox);
	document.querySelector("select").addEventListener("change", filterByCheckbox);

	filterByCheckbox();
}