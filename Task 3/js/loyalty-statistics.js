// CARGO MIEMBROS
let members = [];
for(i = 0; i < data.results[0].members.length; i++){
	members.push(data.results[0].members[i])
};

// DEFINO STATS
let stats = {
	"democrat_amount" : 0,
	"republican_amount" : 0,
	"independent_amount" : 0,
	'total_amount' : 0,
	"d_votes_party" : 0,
	"r_votes_party" : 0,
	"i_votes_party" : 0,
	"missed_votes_party" : 0,
	"least_loyal" : [],
	"most_loyal" : [],
	"least_engaged" : [],
	"most_engaged" : [],
	"least_missed_votes" : [],
	"most_missed_votes" : []
};

// LISTAS DE MIEMBROS DE CADA PARTIDO
let democratList = [];
let republicanList = [];
let independentList = [];

// VOTOS TOTALES, DEMOCRATAS, REPUBLICANOS E INDEPENDIENTES
let missed_votes = 0;
let democrat_votes_with_party = 0;
let republican_votes_with_party = 0;
let independent_votes_with_party = 0;

	
function atGlance (){	
	// RECORRO MIEMBROS PARA OBTENER LISTAS DE CADA PARTIDO
	members.forEach(member => {
		if (member.party == 'D'){
			democratList.push(member);
		}
		else if (member.party == 'R'){
			republicanList.push(member);
		}
		else{
			independentList.push(member);
		}

		stats.total_amount ++;
		missed_votes+=member.votes_with_party_pct;
	})

	// CANTIDAD DE MIEMBROS DE CADA PARTIDO
	stats.democrat_amount = democratList.length;
	stats.republican_amount = republicanList.length;
	stats.independent_amount = independentList.length;


	// VOTOS TOTALES WITH PARTY
	stats.missed_votes_party =+ (missed_votes / members.length).toFixed(2);


	// VOTOS DEMOCRATS WITH PARTY
	for(let i = 0; i < democratList.length; i++){
		democrat_votes_with_party += democratList[i].votes_with_party_pct;
	}
	stats.d_votes_party =+ (democrat_votes_with_party / democratList.length).toFixed(2);


	// VOTOS REPUBLICANS WITH PARTY
	for(let i = 0; i < republicanList.length; i++){
		republican_votes_with_party += republicanList[i].votes_with_party_pct;
	}
	stats.r_votes_party =+ (republican_votes_with_party / republicanList.length).toFixed(2);


	// VOTOS INDEPENDENTS WITH PARTY
	for(let i = 0; i < independentList.length; i++){
		independent_votes_with_party += independentList[i].votes_with_party_pct;
	}
	stats.i_votes_party =+ (independent_votes_with_party / independentList.length).toFixed(2);

	// CARGO at glance
	for(let i = 0; i < 4; i++){
		if (i == 0 && !isNaN(stats.d_votes_party)){
			document.querySelector('#glance').innerHTML += '<tr><td>Democrats</td><td>' + stats.democrat_amount  + '</td><td>' + stats.d_votes_party + '%</td></tr>'
		}
		else {if(i == 0){document.querySelector('#glance').innerHTML += '<tr><td>Democrats</td><td>' + stats.democrat_amount  + '</td><td>-</td></tr>'}}

		
		if (i == 1 && !isNaN(stats.r_votes_party)){
			document.querySelector('#glance').innerHTML += '<tr><td>Republicans</td><td>' + stats.republican_amount  + '</td><td>' + stats.r_votes_party + '%</td></tr>'
		}
		else {if(i == 1){document.querySelector('#glance').innerHTML += '<tr><td>Republicans</td><td>' + stats.republican_amount  + '</td><td>-</td></tr>'}}


		if (i == 2 && !isNaN(stats.i_votes_party)){
			document.querySelector('#glance').innerHTML += '<tr><td>Independents</td><td>' + stats.independent_amount  + '</td><td>' + stats.i_votes_party + '%</td></tr>'
		}
		else {if(i == 2){document.querySelector('#glance').innerHTML += '<tr><td>Independents</td><td>' + stats.independent_amount  + '</td><td>-</td></tr>'}}
		

		if (i == 3 && !isNaN(stats.missed_votes_party)){
			document.querySelector('#glance').innerHTML += '<tr><td>Total</td><td>' + stats.total_amount  + '</td><td>' + stats.missed_votes_party + '%</td></tr>'
		}
		else {if(i == 3){document.querySelector('#glance').innerHTML += '<tr><td>Total</td><td>' + stats.total_amount  + '</td><td>-</td></tr>'}}	
	}
}


function leastLoyal(){
	//ORDENO MEMBERS SEGUN VOTES WITH PARTY ASCENDENTE
	members.sort(function (a, b) {
		if (a.votes_with_party_pct > b.votes_with_party_pct){
			return 1;
		}
		if (a.votes_with_party_pct < b.votes_with_party_pct){
			return -1;
		}
		return 0;
	})

	// CONDICIONES PARA EL PEOR 10% DE LOYALTY
	let non_loyal = [];

	for (let i = 0; i < members.length; i ++){
		if (non_loyal.length == 0 && members[i].total_votes != 0){
			non_loyal.push(members[i]);
		}
		else if ((non_loyal.length > 0) && (members.length/non_loyal.length >= 10) && (members[i].votes_with_party_pct >= (non_loyal[non_loyal.length-1].votes_with_party_pct)) && (members.total_votes != 0)){
			non_loyal.push(members[i]);
		}
	}

	// CARGO Least Loyal
	for (let i = 0; i<non_loyal.length; i++){
		let full_name = non_loyal[i].last_name + ' ' + non_loyal[i].first_name + ' ' + (non_loyal[i].middle_name ? non_loyal[i].middle_name : '');
		document.querySelector("#least_loyal").innerHTML += '<tr><td>' + (non_loyal[i].url != '' ? '<a href= "' + non_loyal[i].url + '" >' + full_name + '</a>'  : full_name) + '</td><td>' + ((non_loyal[i].total_votes * non_loyal[i].votes_with_party_pct)/100).toFixed(0) + '</td><td>' + non_loyal[i].votes_with_party_pct.toFixed(2) + '%' + '</td></tr>'
	}
}


function mostLoyal(){
	//ORDENO MEMBERS SEGUN VOTES WITH PARTY DESCENDENTE
	members.sort(function (a, b) {
		if (a.votes_with_party_pct < b.votes_with_party_pct){
			return 1;
		}
		if (a.votes_with_party_pct > b.votes_with_party_pct){
			return -1;
		}
		return 0;
	})

	// CONDICIONES PARA EL MEJOR 10% DE LOYALTY
	let full_loyal = [];

	for (let i = 0; i < members.length; i ++){
		if (i == 0){
			full_loyal.push(members[i]);
		}
		else if ((members.length/full_loyal.length >= 10) && (members[i].votes_with_party_pct <= (full_loyal[full_loyal.length-1].votes_with_party_pct))){
			full_loyal.push(members[i]);
		}
	}

	// CARGO Most Loyal
	for (let i = 0; i<full_loyal.length; i++){
		let full_name = full_loyal[i].last_name + ' ' + full_loyal[i].first_name + ' ' + (full_loyal[i].middle_name ? full_loyal[i].middle_name : '');
		document.querySelector("#most_loyal").innerHTML += '<tr><td>' + (full_loyal[i].url != '' ? '<a href= "' + full_loyal[i].url + '" >' + full_name + '</a>'  : full_name) + '</td><td>' + ((full_loyal[i].total_votes * full_loyal[i].votes_with_party_pct)/100).toFixed(0) + '</td><td>' + full_loyal[i].votes_with_party_pct.toFixed(2) + '%' + '</td></tr>'
	}
}


atGlance();
leastLoyal();
mostLoyal();