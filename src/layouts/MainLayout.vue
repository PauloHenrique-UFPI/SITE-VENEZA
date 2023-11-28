<template>
  <q-layout view="hHh Lpr fFf" :class="{'dark-theme': darkMode}">

    <q-header elevated class="text-red" height-hint="98" style="background: linear-gradient(to right, rgb(255, 255, 255), orange);">
      <q-toolbar>
        <q-toolbar-title style="font-family: 'Comic Sans MS'; font-size: 30px;">
          <q-avatar>
            <img src="../assets/logo.png">
          </q-avatar>
          Pizzaria Veneza
        </q-toolbar-title>

        <div class="q-pa-md">
      <q-btn-dropdown
        class="glossy"
        color="orange"

      >
        <template v-slot:label>
          <div class="row items-center no-wrap">
            <q-icon left name="settings" />

          </div>
        </template>

      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Configurações</div>
          <q-toggle v-model="darkMode" checked-icon="nights_stay"
        color="black" unchecked-icon="light_mode" >Trocar Tema</q-toggle>
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">

          <div class="text-subtitle1 q-mt-md q-mb-xs">
            <q-btn align="around" class="btn-fixed-width"
            color="red" label="Privacidade" icon="lightbulb_outline"
            @click="abrirDetalhes" />
          </div>

          <q-btn
            color="primary"
            label="Logout"
            push
            size="sm"
            v-close-popup
            @click="fazerLogoff"
          />
        </div>
      </div>
    </q-btn-dropdown>
  </div>
      </q-toolbar>

      <!-- <q-tabs align="right">
        <q-route-tab to="/" label="Pedidos" />
        <q-route-tab to="/" label="Informações"/>
        <q-route-tab to="/" label="Sobre nós" />
      </q-tabs> -->

      <q-dialog v-model="dialogDetalhes">
        <q-card
          class="my-card text-white"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
          >
          <q-card-section>
            <div class="text-h6">Política de Privacidade</div>
            <div class="text-subtitle2">por Paulo Henrique</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ lorem }}
          </q-card-section>
          <q-card-actions align="center">
                <q-btn label="Fechar" color="orange" @click="fecharDetalhes" />
          </q-card-actions>
        </q-card>
    </q-dialog>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-negative text-white" height-hint="98">
      <!-- <div> link e mais links depois</div> -->
    </q-footer>

  </q-layout>

</template>

<script>
import { ref, watch } from 'vue'

export default {
  setup () {
    const rightDrawerOpen = ref(false)
    const darkMode = ref(false)
    const dialogDetalhes = ref(false)

    watch(darkMode, (newVal) => {
      document.documentElement.classList.toggle('dark-theme', newVal)
    })

    const abrirDetalhes = () => {
      dialogDetalhes.value = true
    }

    const fecharDetalhes = () => {
      dialogDetalhes.value = false
    }

    function fazerLogoff () {
      // Lógica para o logoff
      localStorage.removeItem('token')
      localStorage.removeItem('auth')
      window.location.href = '/'
    }

    return {
      rightDrawerOpen,
      dialogDetalhes,
      darkMode,
      abrirDetalhes,
      fecharDetalhes,
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      fazerLogoff
    }
  }
}
</script>

<style scoped>
/* Estilos específicos para o tema escuro */
.dark-theme {
  background-color: #373636;
  color: #c6c6c6;
}

.logoff-button {
  background-color: #ccc;
  color: #000;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}
</style>
