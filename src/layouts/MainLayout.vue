<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '../components/layouts/Sidebar.vue'
import Header from '../components/layouts/Header.vue'

const isSidebarCollapsed = ref(false)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-800">
    <Sidebar :is-collapsed="isSidebarCollapsed" @toggle="toggleSidebar" />

    <div class="flex-1 flex flex-col min-w-0">
      <Header @toggle-sidebar="toggleSidebar" />
      <main class="flex-1 p-6 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>