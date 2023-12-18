<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
     <div class="container" style="width: 75%">
       <div class="row">
<div class="col-12 card shadow p-5 text-start mb-5">
                        <h2 class="fw-bold">Add Player Form</h2>

                        <div class="mb-3">
                            <label for="formGroupExampleInput" class="form-label">Player Name</label>
                            <input type="text" ref="player_name" class="form-control form-control" id="formGroupExampleInput" placeholder="Player Name">
                        </div>
                        <div class="mb-3">
                            <label for="formGroupExampleInput2" class="form-label-lg">Points</label>
                            <input type="number" ref="points" class="form-control form-control-lg" id="formGroupExampleInput2" placeholder="Points">
                        </div>
                        <div class="mb-3">
                            <label for="formGroupExampleInput2" class="form-label-lg">Deduction</label>
                            <input type="number" ref="deduction" class="form-control form-control-lg" id="formGroupExampleInput2" placeholder="Deduction">
                        </div>
                      
                       
                        <button class="btn btn-primary" style="width: 100px"  @click="addNewPlayer">Add</button>
                    </div>
          <div class="col-12 card shadow">
            <div class="my-5">
               <label for="levelFilter">Select Level:</label>
            <select v-model="selectedLevel" id="levelFilter">
              <option value="">All</option>
              <option value="Pro">Pro</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Beginner">Beginner</option>
            </select>
            </div>
            <table class="table table-striped">
            <tr>
              <th>Player Name</th>
              <th>Score</th>
              <th>Deduction</th>
              <th>Points</th>
              <th>Level</th>
            </tr>
            <tr v-for="data in filteredPlayers" :key="data.id">
              <td>{{data.player_name}}</td>
              <td>{{data.points}}</td>
              <td>{{data.deduction}}</td>
              <td>{{data.score}}</td>
              <td>{{(data.score >= 80)  ? 'Pro' : (data.score < 50) ? 'Beginner' : 'Intermediate'}}</td>
            </tr>
            
          </table>
          </div>

       </div>
     </div>
  </div>
</template>

<script>
import { db, addDoc, collection, setDoc, doc, onSnapshot, orderBy, getDocs, deleteDoc, Timestamp } from '@/firebase.js';

// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
   data(){
        return {
            playersList: [],
            selectedLevel: '', 
        }
    },
     mounted() {
      this.fetchPlayerData();
    },
     computed: {
    filteredPlayers() {
      if (!this.selectedLevel) {
        return this.playersList;
      }

      return this.playersList.filter((data) => data.level === this.selectedLevel);
    },
  },
     methods: {
       async addNewPlayer() {
            try {
                 const player_name = this.$refs.player_name.value.trim();
                 const points = this.$refs.points.value.trim();
                 const deduction = this.$refs.deduction.value.trim();

                  const newDocRef = await addDoc(collection(db, 'players'), {
                    player_name: player_name,
                    points: points,
                    deduction: deduction,
                    date: Timestamp,
                 });
                  console.log('Document added with ID:', newDocRef.id);
                 this.$refs.player_name.value = '';
                 this.$refs.points.value = '';
                 this.$refs.deduction.value = '';
                 window.alert('New Player saved successfully!');
                 this.fetchPlayerData();
            } catch(e) {
                console.log(e)
            }
        },
async fetchPlayerData() {
            try {
                this.playersList = [];
            const q = collection(db, 'players'); 
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                const playerData = {
                    id: doc.id,
                    player_name: doc.data().player_name,
                    points: doc.data().points,
                    deduction: doc.data().deduction,
                    score:doc.data().points - doc.data().deduction,
                    level: doc.data().points - doc.data().deduction >= 80
                    ? 'Pro'
                    : doc.data().points - doc.data().deduction < 50
                    ? 'Beginner'
                    : 'Intermediate',
                    
                };

                console.log(playerData, 'playerData');
                this.playersList.push(playerData);
                
            });
            // this.educations.sort((a, b) => b.date - a.date);
            }catch (e) {
                console.error('Error fetching user data:', e);
            }
      }
     }
}
</script>
