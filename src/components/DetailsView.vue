<template>
    <b-modal id="userDetails" title="User details">
        <b-img v-if="selectedUser.picture" :src="selectedUser.picture.large"/>
        <table>
            <tr v-if="selectedUser.name &&selectedUser.name.first && selectedUser.name.last">
                <td width="150 px">Name</td>
                <td>{{ selectedUser.name.first }} {{ selectedUser.name.last }}</td>
            </tr>
            <tr v-if="selectedUser.gender">
                <td>Gender</td>
                <td>{{ selectedUser.gender }}</td>
            </tr>
            <template v-if="selectedUser.location">
                <tr v-if="selectedUser.location.country">
                    <td>Country</td>
                    <td>{{ selectedUser.location.country }}</td>
                </tr>
                <tr v-if="selectedUser.location.city">
                    <td>City</td>
                    <td>{{ selectedUser.location.city }}</td>
                </tr>
                <tr v-if="selectedUser.location.state">
                    <td>State</td>
                    <td>{{ selectedUser.location.state }}</td>
                </tr>
                <tr v-if="selectedUser.location.postcode">
                    <td>Postalcode</td>
                    <td>{{ selectedUser.location.postcode }}</td>
                </tr>
                <tr v-if="selectedUser.location.street.number && selectedUser.location.street.name">
                    <td>Address</td>
                    <td>{{ selectedUser.location.street.name }} {{ selectedUser.location.street.number }}</td>
                </tr>
                <tr v-if="selectedUser.location.timezone.offset">
                    <td>Timezone</td>
                    <td>{{ selectedUser.location.timezone.offset }}</td>
                </tr>
                <tr v-if="selectedUser.location.timezone.description">
                    <td>Timezone cities</td>
                    <td>{{ selectedUser.location.timezone.description }}</td>
                </tr>
            </template>
            <tr v-if="selectedUser.email">
                <td>Email</td>
                <td>{{ selectedUser.email }}</td>
            </tr>
            <template v-if="selectedUser.dob">
                <tr v-if="selectedUser.dob.date">
                    <td>Date of Birth</td>
                    <td>{{ new Date(selectedUser.dob.date).toLocaleDateString("nl-NL") }}</td>
                </tr>
                <tr v-if="selectedUser.dob.date">
                    <td>Age</td>
                    <td>{{ getAge() }}</td>
                </tr>
            </template>
            <tr v-if="selectedUser.phone">
                <td>Phone</td>
                <td>{{ selectedUser.phone }}</td>
            </tr>
            <tr v-if="selectedUser.cell">
                <td>Cell</td>
                <td>{{ selectedUser.cell }}</td>
            </tr>
            <tr v-if="selectedUser.nat">
                <td>Nationality</td>
                <td>{{ selectedUser.nat }}</td>
            </tr>
        </table>
    </b-modal>
</template>
<script>
export default {
    name: 'detailsView',
    props: {
        selectedUser: {}
    },
    methods: {
        getAge() {
            let ageMS = new Date(new Date() - new Date(this.selectedUser.dob.date));
            let age = new Date();
            age.setTime(ageMS);

            let ageYear = age.getFullYear() - 1970

            return ageYear;
        }
    }
}
</script>
