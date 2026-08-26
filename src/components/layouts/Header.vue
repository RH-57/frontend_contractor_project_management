<script setup lang="ts">
import {computed} from 'vue'
import { useRoute } from 'vue-router';

defineEmits(['toggle-sidebar'])

const route = useRoute()

const breadcrumbs = computed(() => {
    const paths = route.path.split('/').filter(Boolean)
    return paths.map((path) => path.charAt(0).toUpperCase() + path.slice(1))
})
</script>

<template>
    <header class="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
        <div class="flex items-center gap-4">
            <button
                @click="$emit('toggle-sidebar')"
                class="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            
            </button>
        </div>
    </header>
</template>