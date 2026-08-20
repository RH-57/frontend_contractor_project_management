<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { useAuthUser } from '../composables/useAuthUser';
import { useLogout } from '../composables/auth/useLogout';

const user = useAuthUser()
const logout = useLogout()
const route = useRoute();

// State Sidebar
const isCollapsed = ref(false); // Mode mini di desktop
const isMobileOpen = ref(false); // Mode slide-in di mobile

// Toggle Handlers
const toggleDesktopSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const toggleMobileSidebar = () => {
  isMobileOpen.value = !isMobileOpen.value;
};

const getInitials = (name?: string): string => {
    if (!name) return 'U'

    const words = name.trim().split(/\s+/)

    if (words.length === 1) {
        return words[0].slice(0, 2).toUpperCase()
    }

    return (words[0][0] + words[1][0]).toUpperCase()
}

// Menu Items Navigation
const menuItems = [
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  },
  {
    name: 'Proyek',
    path: '/admin/projects',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4'
  },
  {
    name: 'Tugas & Pekerjaan',
    path: '/admin/tasks',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
  },
  {
    name: 'Keuangan / RAB',
    path: '/admin/finances',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    name: 'Pengaturan',
    path: '/admin/settings',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
  }
];
</script>

<template>
  <div class="flex min-h-screen bg-slate-50">
    
    <!-- 1. TOMBOL HAMBURGER MOBILE (Hanya Tampil di Layar Kecil) -->
    <div class="lg:hidden fixed top-4 left-4 z-50">
      <button 
        @click="toggleMobileSidebar" 
        class="p-2.5 rounded-xl bg-white text-slate-700 shadow-md border border-slate-200 focus:outline-none hover:bg-slate-50 transition"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- 2. OVERLAY MOBILE (Latar belakang gelap samar saat sidebar mobile terbuka) -->
    <div 
      v-if="isMobileOpen" 
      @click="toggleMobileSidebar"
      class="lg:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity"
    ></div>

    <!-- 3. MAIN SIDEBAR COMPONENT -->
    <aside 
      :class="[
        // Base Styling
        'fixed lg:static top-0 bottom-0 left-0 z-40 bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-300 ease-in-out shadow-sm',
        
        // Desktop Collapse Width Toggle
        isCollapsed ? 'lg:w-20' : 'lg:w-64',
        
        // Mobile Slide In / Out
        isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- HEADER SIDEBAR (Logo & Toggle Button) -->
      <div>
        <div class="h-20 flex items-center justify-between px-4 border-b border-slate-100">
          
          <!-- Logo & Brand Title -->
          <div class="flex items-center space-x-3 overflow-hidden">
            <div class="h-10 w-10 shrink-0 rounded-xl bg-[#FBB03B] flex items-center justify-center text-[#0B1C33] shadow-sm">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 2H9c-1.1 0-2 .9-2 2v6H5c-1.1 0-2 .9-2 2v10h18V4c0-1.1-.9-2-2-2zm-6 16h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm0-4h-2V4h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V8h2v2zm0-4h-2V4h2v2z"/>
              </svg>
            </div>
            
            <div v-show="!isCollapsed || isMobileOpen" class="flex flex-col transition-opacity duration-200">
              <span class="font-black text-slate-900 tracking-wider leading-none text-sm">KSP</span>
              <span class="text-[10px] font-bold text-slate-400 tracking-widest uppercase">KONTRAKTOR</span>
            </div>
          </div>

          <!-- Desktop Collapse Toggle Button -->
          <button 
            @click="toggleDesktopSidebar" 
            class="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            :title="isCollapsed ? 'Buka Sidebar' : 'Tutup Sidebar'"
          >
            <svg 
              class="w-5 h-5 transform transition-transform duration-300" 
              :class="{ 'rotate-180': isCollapsed }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <!-- NAVIGATION LINKS -->
        <nav class="p-3 space-y-1.5 mt-2">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            :class="[
              'flex items-center px-3 py-3 rounded-xl font-medium text-sm transition-all duration-150 group relative',
              route.path === item.path 
                ? 'bg-[#0B1C33] text-white shadow-md shadow-slate-900/10' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            ]"
          >
            <!-- Icon -->
            <svg 
              class="w-5 h-5 shrink-0 transition duration-150"
              :class="route.path === item.path ? 'text-[#FBB03B]' : 'text-slate-400 group-hover:text-slate-700'"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
            </svg>

            <!-- Label Menu (Sembunyi saat mini mode) -->
            <span 
              v-show="!isCollapsed || isMobileOpen" 
              class="ml-3 truncate font-semibold"
            >
              {{ item.name }}
            </span>

            <!-- Tooltip saat ter-collapse di Desktop -->
            <div 
              v-if="isCollapsed && !isMobileOpen"
              class="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg"
            >
              {{ item.name }}
            </div>
          </router-link>
        </nav>
      </div>

      <!-- FOOTER SIDEBAR (User Info / Logout) -->
      <div class="p-3 border-t border-slate-100">
        <div 
          :class="[
            'flex items-center p-2 rounded-xl transition duration-150',
            isCollapsed && !isMobileOpen ? 'justify-center' : 'space-x-3'
          ]"
        >
          <!-- User Avatar -->
          <div class="w-9 h-9 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 text-[#0B1C33] font-bold text-xs">
            {{ getInitials(user?.name) }}
          </div>

          <!-- User Details -->
          <div v-show="!isCollapsed || isMobileOpen" class="flex flex-col truncate">
            <span class="text-xs font-bold text-slate-800 truncate">{{user?.name}}</span>
            <span class="text-[10px] text-slate-400 truncate">{{user?.email}}</span>
          </div>
        </div>

        <!-- Logout Button -->
        <button 
            @click="logout"
            type="button"
          class="mt-2 w-full flex items-center px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition duration-150"
          :class="isCollapsed && !isMobileOpen ? 'justify-center' : 'space-x-3' " 
        >
          <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span v-show="!isCollapsed || isMobileOpen">Keluar</span>
        </button>
      </div>

    </aside>

    <!-- MAIN CONTENT AREA WRAPPER (Contoh Wadah Halaman Utama) -->
    <main class="flex-1 p-6 lg:p-8 mt-14 lg:mt-0">
      <div class="max-w-7xl mx-auto">
        <!-- Content halaman Anda ditempatkan di sini -->
        <router-view />
      </div>
    </main>

  </div>
</template>