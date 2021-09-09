<template>
    <div>
        <detailsView :selected-user="selectedUser"/>
        <b-form-group label="Selected genders:">
            <b-form-checkbox-group
                v-model="selectedGenders"
                :options="checkboxOptions">
            </b-form-checkbox-group>
        </b-form-group>
        <table class="table">
            <thead>
            <tr>
                <th scope="col" v-for="header in tableHeaders" :key="header.label" v-on:click="sort(header.key)" class="cursor-pointer">{{ header.label }} <span
                    v-if="header.key === currentSort">
                    <b-icon-sort-up v-if="currentSortDir==='asc'"/>
                    <b-icon-sort-down v-if="currentSortDir==='desc'"/>
                </span>
                    <b-icon-filter v-else/>
                </th>

                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(user, index) in sortedRandomUsers" :key="index">
                <td v-for="(header, index) in tableHeaders" :key="index">{{ getDataFromKey(header.key, user) }}</td>
                <td>
                    <b-button size="sm" v-on:click="selectedUser = user" v-b-modal.userDetails>Details</b-button>
                </td>
            </tr>
            </tbody>
        </table>

<!--        <b-table-->
<!--            :items="sortedRandomUsers"-->
<!--            :fields="tableHeaders"-->
<!--            :sort-by.sync="sortBy"-->
<!--            :sort-desc.sync="sortDesc"-->
<!--        />-->

    </div>
</template>

<script>
import DetailsView from "@/components/DetailsView";

export default {
    name: 'Home',
    components: {DetailsView},
    created() {
        fetch('https://randomuser.me/api/?results=10')
            .then(this.handleErrors)
            .then(data => {
                this.randomUsers = [...data.results]
                this.randomUsersCopy = [...data.results]
            })
            .catch(err => {
                console.log(err)
            })
    },
    methods: {
        handleErrors(response) {
            if (response.status >= 200 && response.status <= 299)
                return response.json()
            else
                throw Error(response.statusText);
        },
        sort(columnName) {
            if (columnName === this.currentSort) {
                if (this.currentSortDir === "asc") {
                    this.currentSortDir = "desc"
                } else if (this.currentSortDir === "desc") {
                    this.currentSort = "";
                    this.currentSortDir = "";
                }
            } else {
                this.currentSort = columnName;
                this.currentSortDir = "asc"
            }
        },
        splitMultipleKeys(keys) {
            return keys.split('.');
        },
        getDataFromKey(keys, user) {
            let splits = this.splitMultipleKeys(keys);
            if (splits.length === 1) return user[keys];
            let singleData = {...user}
            for (let i = 0; i < splits.length; i++) {
                singleData = singleData[splits[i]]
            }
            return singleData;
        }
    },
    computed: {
        // First the filter is applied, then the remaining items are used in the sorting code
        filteredRandomUsers: function () {
            return [...this.randomUsers].filter(user => {
                return this.selectedGenders.includes(user.gender)
            })
        },

        sortedRandomUsers: function () {
            if (this.currentSort === "") { // no applied sorting
                return this.filteredRandomUsers;
            } else // applying sorting
                return [...this.filteredRandomUsers].sort((a, b) => {
                    let modifier = 1;
                    if (this.currentSortDir === 'desc') modifier = -1;
                    if (this.getDataFromKey(this.currentSort, a) < this.getDataFromKey(this.currentSort, b)) return -1 * modifier;
                    if (this.getDataFromKey(this.currentSort, a) > this.getDataFromKey(this.currentSort, b)) return 1 * modifier;
                    return 0;
                })
        }
    },
    data() {
        return {
            randomUsers: [],
            randomUsersCopy: [],
            tableHeaders: [
                {label: 'First name', key: 'name.first', sortable: true},
                {label: 'Last name', key: 'name.last', sortable: true},
                {label: 'Gender', key: 'gender', sortable: true},
                {label: 'Email', key: 'email', sortable: true},
                {label: 'Country', key: "location.country", sortable: true},
                {label: 'City', key: 'location.city'},
                {label: 'Street', key: 'location.street.name'},
                {label: 'Number', key: 'location.street.number'},
            ],
            checkboxOptions: [
                {text: 'Female', value: 'female'},
                {text: 'Male', value: 'male'}
            ],

            selectedGenders: ["female", "male"],

            // sorting for custom table
            currentSort: '',
            currentSortDir: '',

            // bootstrap table
            sortBy: '',
            sortDesc: false,

            // data field for modal
            selectedUser: {},
        }
    }
}
</script>
