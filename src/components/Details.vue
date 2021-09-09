<template>
    <b-modal id="userDetails" title="User details">
        <b-img v-if="selectedUser.picture" :src="selectedUser.picture.large"/>
        <table>
            <tr v-if="selectedUser.name &&selectedUser.name.first && selectedUser.name.last">
                <th scope="row">Name</th>
                <td>{{ selectedUser.name.first }} {{ selectedUser.name.last }}</td>
            </tr>
            <tr v-if="selectedUser.gender">
                <th scope="row">Gender</th>
                <td>{{ selectedUser.gender }}</td>
            </tr>
            <template v-if="selectedUser.location">
                <tr v-if="selectedUser.location.country">
                    <th scope="row">Country</th>
                    <td>{{ selectedUser.location.country }}</td>
                </tr>
                <tr v-if="selectedUser.location.city">
                    <th scope="row">City</th>
                    <td>{{ selectedUser.location.city }}</td>
                </tr>
                <tr v-if="selectedUser.location.state">
                    <th scope="row">State</th>
                    <td>{{ selectedUser.location.state }}</td>
                </tr>
                <tr v-if="selectedUser.location.postcode">
                    <th scope="row">Postalcode</th>
                    <td>{{ selectedUser.location.postcode }}</td>
                </tr>
                <tr v-if="selectedUser.location.street.number && selectedUser.location.street.name">
                    <th scope="row">Address</th>
                    <td>{{ selectedUser.location.street.name }} {{ selectedUser.location.street.number }}</td>
                </tr>
                <tr v-if="selectedUser.location.timezone.offset">
                    <th scope="row">Timezone</th>
                    <td>{{ selectedUser.location.timezone.offset }}</td>
                </tr>
                <tr v-if="selectedUser.location.timezone.description">
                    <th scope="row">Timezone cities</th>
                    <td>{{ selectedUser.location.timezone.description }}</td>
                </tr>
            </template>
            <tr v-if="selectedUser.email">
                <th scope="row">Email</th>
                <td>{{ selectedUser.email }}</td>
            </tr>
            <template v-if="selectedUser.dob">
                <tr v-if="selectedUser.dob.date">
                    <th scope="row">Date of Birth</th>
                    <td>{{ new Date(selectedUser.dob.date).toLocaleDateString("nl-NL") }}</td>
                </tr>
                <tr v-if="selectedUser.dob.date">
                    <th scope="row">Age</th>
                    <td>{{ getAge }}</td>
                </tr>
            </template>
            <tr v-if="selectedUser.phone">
                <th scope="row">Phone</th>
                <td>{{ selectedUser.phone }}</td>
            </tr>
            <tr v-if="selectedUser.cell">
                <th scope="row">Cell</th>
                <td>{{ selectedUser.cell }}</td>
            </tr>
            <tr v-if="selectedUser.nat">
                <th scope="row">Nationality</th>
                <td>{{ selectedUser.nat }}</td>
            </tr>
        </table>
    </b-modal>
</template>
<script>
export default {
    name: 'Details',
    props: {
        selectedUser: {}
    },
    computed: {
        getAge() {
            const ageMS = new Date(new Date() - new Date(this.selectedUser.dob.date));
            const age = new Date();
            age.setTime(ageMS);

            return age.getFullYear() - 1970
        }
    }
}
</script>
