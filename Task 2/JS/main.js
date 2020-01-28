data.results[0].members.forEach(members =>{
	let full_name = members.last_name + ' ' + members.first_name + ' ' + (members.middle_name ? members.middle_name : '');
	document.querySelector("tbody").innerHTML += '<tr><td>' + (members.url != '' ? '<a href= "' + members.url + '" >' + full_name + '</a>'  : full_name) + '</td><td>' + members.party + '</td><td>' + members.state + '</td><td>' + members.seniority + '</td><td>' + members.votes_with_party_pct + '%</td></tr>';
});
