<script setup lang="ts">
import {ref} from 'vue'
import {useRoute} from 'vue-router'
import { useAuthUser } from '../../composables/useAuthUser';
import { useLogout } from '../../composables/auth/useLogout';

const user = useAuthUser()
const logout = useLogout()

const props = defineProps<{
  isCollapsed: boolean
}>()
defineEmits(['toggle'])

const route = useRoute()

const isActive = (path: string) => route.path === path
</script>

<template>
    <aside
        :class="[
            'bg-white border-r border-slate-200 flex flex-col transition-all duration-300 z-20 sticky top-0 h-screen',
            isCollapsed ? 'w-20' : 'w-64'
        ]"
    >
        <div class="h-16 flex items-center justify-between px-4 border-b border-slate-100">
            <div class="flex items-center gap-3 overflow-hidden">
                <div class="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center text-white shrink-0 font-bold shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                </div>
                <span v-if="!isCollapsed" class="font-bold text-sm text-slate-800 tracking-tight whitespace-nowrap">
                    KSP Project Management
                </span>
            </div>
        </div>

        <!--Navigation Menu-->
        <div class="flex-1 overflow-y-auto py-4 px-3 space-y-6">
            <div>
                <router-link
                    to="/dashboard"
                    :class="[
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-color',
                        isActive('/dashboard') ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    ]"
                >
                    <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
                    <span v-if="!isCollapsed">Dashboard</span>
                </router-link>
            </div>
        </div>

        <div class="p-3 border-t border-slate-100 space-y-2">
            <div class="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
                <div class="w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-xs shrink-0">
                    SA
                </div>
                <div v-if="!isCollapsed" class="min-m-0 flex-1">
                    <p class="text-xs font-semibold text-slate-800 truncate">{{ user?.name }}</p>
                    <p class="text-[10px] text-slate-400 truncate">{{ user?.email }}</p>
                </div>
            </div>

            <button
                @click="logout"
                :title="isCollapsed ? 'Keluar / Logout' : ''"
                :class="[
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors',
                    isCollapsed ? 'justify-center' : ''
                ]"
            >
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                <span v-if="!isCollapsed">Keluar / Logout</span>
            </button>
        </div>
    </aside>
</template>