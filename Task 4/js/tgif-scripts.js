let data;
let url = "https://api.propublica.org/congress/v1/113/senate/members.json";

let init = {
    method: 'GET',
    headers:{
        'X-API-Key': 'mqgiryUXaOUZNPgJyIpeCP8U45XhSE4oBsi0h7Yb'
    }
}
const app = new Vue({
    el: '#app',
    data: {
        members: [],
        d_amount: 0,
        r_amount: 0,
        i_amount: 0,
        total_amount: 0,
        d_votes_with_party: 0,
        r_votes_with_party: 0,
        i_votes_with_party: 0,
        total_votes_with_party: 0,
        least_engaged: [],
        most_engaged: [],
        least_loyal: [],
        most_loyal: [],
        parties: ['Democrats', 'Republicans', 'Independents'],
        checkedParties: ['D', 'R', 'I'],
        stateArray: [],
        current: 'home',
        readMore: true
    },

    created(){
        fetch(url, init)
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
            app.members = data.results[0].members;
            app.getStats();
            app.leastAttendance();
            app.mostAttendance();
            app.leastLoyal();
            app.mostLoyal();
            app.loadStates();
            app.members.sort(function (a, b) {
                if (a.last_name > b.last_name){
                    return 1;
                }
                if (a.last_name < b.last_name){
                    return -1;
                }
            })
        })
        
        .catch(function(error){
            console.log(error)
        })
        
    },
    methods:{
        getStats(){
            this.members = data.results[0].members.filter(e => e.total_votes != 0);
            app.members.forEach(e => {
                if(e.party == 'D'){
                    app.d_amount ++;
                    app.d_votes_with_party += e.votes_with_party;
                }
                else if (e.party == 'R'){
                    app.r_amount ++;
                    app.r_votes_with_party += e.votes_with_party;
                }
                else{
                    app.i_amount ++;
                    app.i_votes_with_party += e.votes_with_party;
                }
                app.total_amount ++;
                app.total_votes_with_party += e.votes_with_party;
            });
            this.d_votes_with_party = (this.d_votes_with_party / this.d_amount);
            this.r_votes_with_party = (this.r_votes_with_party / this.r_amount);
            this.i_votes_with_party = (this.i_votes_with_party / this.i_amount);
            this.total_votes_with_party = (this.total_votes_with_party / this.total_amount); 
        },

        leastAttendance (){
            //ORDENO MEMBERS SEGUN ATTENDANCE ASCENDENTE
            this.members.sort(function (a, b) {
                if ((a.missed_votes / a.total_votes)*100 < (b.missed_votes / b.total_votes)*100){
                    return 1;
                }
                if ((a.missed_votes / a.total_votes)*100 > (b.missed_votes / b.total_votes)*100){
                    return -1;
                }
                return 0;
            })

            // CONDICIONES PARA EL PEOR 10% DE ATTENDANCE    
            for (let i = 0; i < this.members.length; i ++){
                if (i == 0){
                    this.least_engaged.push(this.members[i]);
                }
                else if ((this.members.length/this.least_engaged.length >= 10) && ((this.members[i].missed_votes / this.members[i].total_votes)*100 <= (this.least_engaged[this.least_engaged.length-1].missed_votes / this.least_engaged[this.least_engaged.length-1].total_votes*100))){
                    this.least_engaged.push(this.members[i]);
                }
            }
        },

        mostAttendance(){
            // ORDENO MEMBERS SEGUN ATTENDANCE DESCENDIENTE
            this.members.sort(function (a, b) {
                if ((a.missed_votes / a.total_votes)*100 > (b.missed_votes / b.total_votes)*100){
                    return 1;
                }
                if ((a.missed_votes / a.total_votes)*100 < (b.missed_votes / b.total_votes)*100){
                    return -1;
                }
                return 0;
            })
    
            // CONDICIONES PARA EL MEJOR 10% DE ATTENDANCE
            for (let i = 0; i < this.members.length; i ++){
                if (i == 0){
                    this.most_engaged.push(this.members[i]);
                }
                else if ((this.members.length/this.most_engaged.length >= 10) && ((this.members[i].missed_votes / this.members[i].total_votes)*100 >= (this.most_engaged[this.most_engaged.length-1].missed_votes / this.most_engaged[this.most_engaged.length-1].total_votes*100))){
                    this.most_engaged.push(this.members[i]);
                }
            }
        },

        leastLoyal(){
            //ORDENO MEMBERS SEGUN VOTES WITH PARTY ASCENDENTE
            this.members.sort(function (a, b) {
                if (a.votes_with_party_pct > b.votes_with_party_pct){
                    return 1;
                }
                if (a.votes_with_party_pct < b.votes_with_party_pct){
                    return -1;
                }
                return 0;
            })
    
            // CONDICIONES PARA EL PEOR 10% DE LOYALTY    
            for (let i = 0; i < this.members.length; i ++){
                if (i == 0){
                    this.least_loyal.push(this.members[i]);
                }
                else if ((this.members.length/this.least_loyal.length) >= 10 && (this.members[i].votes_with_party_pct >= (this.least_loyal[this.least_loyal.length-1].votes_with_party_pct))){
                    this.least_loyal.push(this.members[i]);
                }
            }

            // CONDICIONES PARA EL PEOR 10% DE ATTENDANCE    
            // for (let i = 0; i < this.members.length; i ++){
            //     if (i == 0){
            //         this.least_engaged.push(this.members[i]);
            //     }
            //     else if ((this.members.length/this.least_engaged.length >= 10) && ((this.members[i].missed_votes / this.members[i].total_votes)*100 <= (this.least_engaged[this.least_engaged.length-1].missed_votes / this.least_engaged[this.least_engaged.length-1].total_votes*100))){
            //         this.least_engaged.push(this.members[i]);
            //     }
            // }
        },

        mostLoyal(){
            //ORDENO MEMBERS SEGUN VOTES WITH PARTY DESCENDENTE
            this.members.sort(function (a, b) {
                if (a.votes_with_party_pct < b.votes_with_party_pct){
                    return 1;
                }
                if (a.votes_with_party_pct > b.votes_with_party_pct){
                    return -1;
                }
                return 0;
            })
    
            // CONDICIONES PARA EL MEJOR 10% DE LOYALTY    
            for (let i = 0; i < this.members.length; i ++){
                if (i == 0){
                    this.most_loyal.push(this.members[i]);
                }
                else if ((this.members.length/this.most_loyal.length >= 10) && (this.members[i].votes_with_party_pct <= (this.most_loyal[this.most_loyal.length-1].votes_with_party_pct))){
                    this.most_loyal.push(this.members[i]);
                }
            }
        },

        loadStates(){
            this.members.forEach(member =>{
                if (app.stateArray.indexOf(member.state) == -1) {
                    this.stateArray.push(member.state)
                }
            });
        
            this.stateArray.sort();
        },


    },

    computed:{


        
    }
    



    

})

