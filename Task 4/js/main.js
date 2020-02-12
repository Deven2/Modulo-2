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