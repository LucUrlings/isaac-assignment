<template>
    <div>
        <b-alert :show="showError" variant="danger">Something went wrong during the retrieval of the data. Look in the developer console for more information or try reloading the
            page to try again.
        </b-alert>
        <detailsView :selected-user="selectedUser"/>
        <b-form-group label="Selected genders:">
            <b-form-checkbox-group
                v-model="selectedGenders"
                :options="checkboxOptions">
            </b-form-checkbox-group>
        </b-form-group>
        <div class="table-responsive">
            <table class="table">
                <caption>Random users</caption>
                <thead>
                <tr>
                    <th scope="col" v-for="header in tableHeaders" :key="header.label + header.key" v-on:click="sort(header.key)" class="cursor-pointer">{{ header.label }}
                        <span
                            v-if="header.key === currentSort">
                        <b-icon-sort-up v-if="currentSortDirection==='asc'"/>
                        <b-icon-sort-down v-if="currentSortDirection==='desc'"/>
                    </span>
                        <b-icon-filter v-else/>
                    </th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(user, index) in sortedFilteredRandomUsers" :key="index">
                    <td v-for="(header, hIndex) in tableHeaders" :key="hIndex">{{ getDataFromKey(header.key, user) }}</td>
                    <td>
                        <b-button size="sm" v-on:click="selectedUser = user" v-b-modal.userDetails>Details</b-button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import DetailsView from "@/components/Details";

export default {
    name: 'Table',
    components: {DetailsView},
    created() {
        fetch('https://randomuser.me/api/?results=10')
            .then(this.handleErrors)
            .then(data => {
                this.randomUsers = [...data.results];
            })
            .catch(err => {
                console.log(err);
                this.showError = true;
            })
    },
    methods: {
        handleErrors(response) {
            if (response.status >= 200 && response.status <= 299)
                return response.json();
            else
                throw Error(response.statusText);
        },
        sort(columnName) {
            if (columnName === this.currentSort) {
                if (this.currentSortDirection === "asc") {
                    this.currentSortDirection = "desc";
                } else if (this.currentSortDirection === "desc") {
                    this.currentSort = "";
                    this.currentSortDirection = "";
                }
            } else {
                this.currentSort = columnName;
                this.currentSortDirection = "asc";
            }
        },
        splitMultipleKeys(keys) {
            return keys.split('.');
        },
        getDataFromKey(keys, user) {
            const splits = this.splitMultipleKeys(keys);
            if (splits.length === 1) return user[keys];
            let singleData = {...user};
            for (let i = 0; i < splits.length; i++) {
                singleData = singleData[splits[i]];
            }
            return singleData;
        }
    },
    computed: {
        // First the filter is applied, then the remaining items are used in the sorting code
        filteredRandomUsers: function () {
            return [...this.randomUsers].filter(user => {
                return this.selectedGenders.includes(user.gender);
            })
        },

        sortedFilteredRandomUsers: function () {
            if (this.currentSort === "") { // no applied sorting
                return this.filteredRandomUsers;
            } else // applying sorting
                return [...this.filteredRandomUsers].sort((a, b) => {
                    let modifier = 1;
                    if (this.currentSortDirection === 'desc') modifier = -1;
                    if (this.getDataFromKey(this.currentSort, a) < this.getDataFromKey(this.currentSort, b)) return -1 * modifier;
                    if (this.getDataFromKey(this.currentSort, a) > this.getDataFromKey(this.currentSort, b)) return modifier;
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
            currentSortDirection: '',

            // bootstrap table
            sortBy: '',
            sortDesc: false,

            // data field for modal
            selectedUser: {},

            // error handling
            showError: false,
        }
    }
}
</script>
