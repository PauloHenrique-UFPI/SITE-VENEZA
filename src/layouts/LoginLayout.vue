<template>
  <q-layout view="hHh Lpr fFf">

    <q-header elevated class="text-red" height-hint="98" style="background: linear-gradient(to right, rgb(221, 98, 10), rgb(255, 255, 255));">
      <q-toolbar class="text-center" style="padding: 40px 0;">
        <q-toolbar-title>
          <span style="font-size: 40px; font-weight: bold;">Login</span>
          <br />
          Por favor, forneça suas credenciais para entrar no sistema
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-negative text-white" height-hint="98">

  </q-footer>
  </q-layout>

</template>

<script>
const linkList = [
  {
    title: 'Pacientes',
    caption: 'lista de Pacientes',
    icon: 'school',
    name: 'pacientes'
  },
  {
    title: 'Pacientes',
    caption: 'lista de Pacientes',
    icon: 'school',
    name: 'pacientes'
  }
]
import { ref } from 'vue'

export default {
  setup () {
    const rightDrawerOpen = ref(false)

    return {
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  },

  data () {
    return {
      linkList
    }
  }
}

</script>
