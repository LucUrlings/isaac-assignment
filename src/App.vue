<template>
    <div>
        <nav>
            <h1 class="text-center">Random users</h1>
        </nav>
        <b-container>
            <Home/>
        </b-container>
    </div>
</template>

<script>
import Home from './components/Table.vue'

export default {
    name: 'App',
    components: {
        Home
    }
}
</script>
