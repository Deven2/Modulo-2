let data;
let url;

if(document.querySelector("#senators")){
	url = "https://api.propublica.org/congress/v1/113/senate/members.json"
}
else{ 
	url = "https://api.propublica.org/congress/v1/113/house/members.json"}

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
	
	loadAttendancePage();
};

getList(url,init);

function loadAttendancePage(){
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




	function leastAttendance (){
		//ORDENO MEMBERS SEGUN ATTENDANCE ASCENDENTE
		members.sort(function (a, b) {
			if ((a.missed_votes / a.total_votes)*100 < (b.missed_votes / b.total_votes)*100){
				return 1;
			}
			if ((a.missed_votes / a.total_votes)*100 > (b.missed_votes / b.total_votes)*100){
				return -1;
			}
			return 0;
		})

		// CONDICIONES PARA EL PEOR 10% DE ATTENDANCE
		let worst_attendance = [];

		for (let i = 0; i < members.length; i ++){
			if (i == 0){
				worst_attendance.push(members[i]);
			}
			else if ((members.length/worst_attendance.length >= 10) && ((members[i].missed_votes / members[i].total_votes)*100 <= (worst_attendance[worst_attendance.length-1].missed_votes / worst_attendance[worst_attendance.length-1].total_votes*100))){
				worst_attendance.push(members[i]);
			}
		}

		// CARGO Least Engaged
		for (let i = 0; i<worst_attendance.length; i++){
			let full_name = worst_attendance[i].last_name + ' ' + worst_attendance[i].first_name + ' ' + (worst_attendance[i].middle_name ? worst_attendance[i].middle_name : '');
			document.querySelector("#least_engaged").innerHTML += '<tr><td>' + (worst_attendance[i].url != '' ? '<a href= "' + worst_attendance[i].url + '" >' + full_name + '</a>'  : full_name) + '</td><td>' + worst_attendance[i].missed_votes + '</td><td>' + ((worst_attendance[i].missed_votes / worst_attendance[i].total_votes)*100).toFixed(2) + '%' + '</td></tr>'
		}
	}



	function mostAttendance(){
		// ORDENO MEMBERS SEGUN ATTENDANCE DESCENDIENTE
		members.sort(function (a, b) {
			if ((a.missed_votes / a.total_votes)*100 > (b.missed_votes / b.total_votes)*100){
				return 1;
			}
			if ((a.missed_votes / a.total_votes)*100 < (b.missed_votes / b.total_votes)*100){
				return -1;
			}
			return 0;
		})

		// CONDICIONES PARA EL MEJOR 10% DE ATTENDANCE
		let best_attendance = [];

		for (let i = 0; i < members.length; i ++){
			if (i == 0){
				best_attendance.push(members[i]);
			}
			else if ((members.length/best_attendance.length >= 10) && ((members[i].missed_votes / members[i].total_votes)*100 >= (best_attendance[best_attendance.length-1].missed_votes / best_attendance[best_attendance.length-1].total_votes*100))){
				best_attendance.push(members[i]);
			}
		}

		// CARGO Most Engaged
		for (let i = 0; i<best_attendance.length; i++){
			let full_name = best_attendance[i].last_name + ' ' + best_attendance[i].first_name + ' ' + (best_attendance[i].middle_name ? best_attendance[i].middle_name : '');
			document.querySelector("#most_engaged").innerHTML += '<tr><td>' + (best_attendance[i].url != '' ? '<a href= "' + best_attendance[i].url + '" >' + full_name + '</a>'  : full_name) + '</td><td>' + best_attendance[i].missed_votes + '</td><td>' + ((best_attendance[i].missed_votes / best_attendance[i].total_votes)*100).toFixed(2) + '%' + '</td></tr>'
		}
	}

	atGlance();
	leastAttendance();
	mostAttendance();
}







