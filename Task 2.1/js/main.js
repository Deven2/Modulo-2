const members = data.results[0].members;

members.forEach(members =>{
	let full_name = members.last_name + ' ' + members.first_name + ' ' + (members.middle_name ? members.middle_name : '');

	document.querySelector("tbody").innerHTML += '<tr><td>' + (members.url != '' ? '<a href= "' + members.url + '" >' + full_name + '</a>'  : full_name) + '</td><td>' + members.party + '</td><td>' + members.state + '</td><td>' + members.seniority + '</td><td>' + members.votes_with_party_pct + '%</td></tr>';
});

function filter(){
	let checks = document.getElementsByClassName("party");
	document.querySelector("tbody").innerHTML = '';
	
	for (let i = 0; i<checks.length; i++){
		if (checks[i].checked){
			members.filter(e => checks[i].value == e.party).forEach(members =>{
			let full_name = members.last_name + ' ' + members.first_name + ' ' + (members.middle_name ? members.middle_name : '');
			document.querySelector("tbody").innerHTML += '<tr><td>' + (members.url != '' ? '<a href= "' + members.url + '" >' + full_name + '</a>'  : full_name) + '</td><td>' + members.party + '</td><td>' + members.state + '</td><td>' + members.seniority + '</td><td>' + members.votes_with_party_pct + '%</td></tr>';
		})};
	}
}

document.getElementById("checkR").addEventListener("click", filter);
document.getElementById("checkD").addEventListener("click", filter);
document.getElementById("checkI").addEventListener("click", filter);

filter();