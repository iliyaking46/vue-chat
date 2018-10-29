<template>
    <li>
        {{ title }}
        <button v-on:click="$emit('remove')">Удалить</button>
    </li>
</template>

<script>
    export default {
        props: ['title']
    }
</script>