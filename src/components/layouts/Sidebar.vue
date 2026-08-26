<script setup lang="ts">
import {ref} from 'vue'
import {useRoute} from 'vue-router'
import { useAuthUser } from '../../composables/useAuthUser';
import { useLogout } from '../../composables/auth/useLogout';
import {
    Layers,
    LayoutDashboard,
    HardHat,
    Database,
    ChevronDown,
    LogOut,
    Users,
    BookUser
} from 'lucide-vue-next'

const user = useAuthUser()
const logout = useLogout()

const props = defineProps<{
  isCollapsed: boolean
}>()
defineEmits(['toggle'])

const route = useRoute()

const isKonstruksiOpen = ref(false)
const isMasterOpen = ref(false)

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
                    <Layers class="w-5 h-5" />
                </div>
                <div>
                    <span v-if="!isCollapsed" class="font-bold text-lg text-slate-800 tracking-tight whitespace-nowrap">
                    KSP Kontraktor
                </span>
                    <p class="text-[10px] text-slate-500">Project Management System</p>
                </div>
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
                    <LayoutDashboard class="w-5 h-5 shrink-0" />
                    <span v-if="!isCollapsed">Dashboard</span>
                </router-link>
            </div>
            <div>
                <p v-if="!isCollapsed" class="px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                    Konstruksi
                </p>
                <div>
                    <button
                        @click="isKonstruksiOpen = !isKonstruksiOpen"
                        class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                        <div class="flex items-center gap-3">
                            <HardHat class="w-5 h-5 shrink-0" />
                            <span v-if="!isCollapsed">Konstruksi</span>
                        </div>
                        <ChevronDown v-if="!isCollapsed" :class="['text-xs transition-transform', isKonstruksiOpen ? 'rotate-180' : '']" />
                    </button>
                </div>
            </div>
            <div>
                <p v-if="!isCollapsed" class="px-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                    Master
                </p>
                <div>
                    <button
                        @click="isMasterOpen = !isMasterOpen"
                        class="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                        <div class="flex items-center gap-3">
                            <Database class="w-5 h-5 shrink-0" />
                            <span v-if="!isCollapsed">Master Data</span>
                        </div>
                        <ChevronDown v-if="!isCollapsed" :class="['text-xs transition-transform', isMasterOpen ? 'rotate-180' : '']" />
                    </button>
                    <div
                        v-show="isMasterOpen && !isCollapsed"
                        class="pl-9 pr-2 py-1 space-y-1"
                    >
                        <router-link
                            to="/master/karyawan"
                            :class="[
                                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors',
                                isActive('/master/karyawan') 
                                ? 'bg-orange-50 text-orange-600 font-semibold' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            ]"
                        >
                            <BookUser class="w-4 h-4 shrink-0" />
                            <span>Customer</span>
                        </router-link>
                        <router-link
                            to="/master/karyawan"
                            :class="[
                                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors',
                                isActive('/master/karyawan') 
                                ? 'bg-orange-50 text-orange-600 font-semibold' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            ]"
                        >
                            <Users class="w-4 h-4 shrink-0" />
                            <span>Karyawan</span>
                        </router-link>
                    </div>
                </div>
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
                <LogOut class="w-4 h-4 shrink-0" />
                <span v-if="!isCollapsed">Keluar / Logout</span>
            </button>
        </div>
    </aside>
</template>