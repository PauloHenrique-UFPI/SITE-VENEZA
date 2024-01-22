<template>
  <q-layout view="hHh Lpr fFf" :class="{'dark-theme': darkMode}">

    <q-header elevated class="text-black" height-hint="78" style="background-color: rgb(27, 3, 52);">
      <q-toolbar>
          <q-toolbar-title style="font-family: 'Comic Sans MS'; color: white;">
            <!-- <q-avatar>
              <img src="../assets/logo.png">
            </q-avatar> -->
           <a href="/#/home">
            <span style="color: #ffaa3b;">Pizzaria</span>
            <span style="color: #00FF00;"> Veneza</span>
          </a>

          </q-toolbar-title>

          <!-- Adicione v-if diretamente ao q-tabs -->
          <q-tabs v-if="!isSmallScreen" align="right">
            <q-route-tab to="/homeL" class="t1" label="Inicio"/>
            <q-route-tab to="/sobre" class="t1" label="Sobre nós"/>
            <q-route-tab to="/contato" class="t1" label="Contato"/>
            <q-btn
              v-if="!isAuth"
              size="15px"
              class="q-px-xl q-py-xs"
              color="orange"
              label="Login"
              to="/"
            />
          </q-tabs>

          <q-btn
            v-else
            @click="toggleSideNav"
            round
            size="10px"
            icon="local_pizza"
            color="orange"
          />
        </q-toolbar>

    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <q-list>
        <q-item clickable @click="navigateTo('/index')">
          <q-item-section avatar>
            <q-avatar>
              <q-icon name="home" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <span style="text-decoration: underline;">Inicio</span>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigateTo('/sobre')">
          <q-item-section avatar>
            <q-avatar>
              <q-icon name="info" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <span style="text-decoration: underline;">Sobre nós</span>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigateTo('/contato')">
          <q-item-section avatar>
            <q-avatar>
              <q-icon name="email" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <span style="text-decoration: underline;">Contato</span>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="!isAuth" clickable @click="navigateTo('/')">
          <q-item-section avatar>
            <q-avatar>
              <q-icon name="login" color="orange" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <span style="text-decoration: underline; color: orange;">Login</span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const rightDrawerOpen = ref(false)
    const darkMode = ref(false)
    const isSmallScreen = ref(false)
    const router = useRouter()

    const navigateTo = (route) => {
      // Use router.push para navegar para a rota desejada
      router.push(route)

      // Feche o drawer após a navegação, se necessário
      rightDrawerOpen.value = false
    }

    const toggleSideNav = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value
    }

    watch(() => {
      isSmallScreen.value = window.innerWidth <= 600 // Ajuste o valor conforme necessário
    }, { immediate: true })

    // ... (restante do código)

    return {
      rightDrawerOpen,
      darkMode,
      toggleSideNav,
      isSmallScreen,
      navigateTo

      // Restante do retorno
    }
  }

  // ... (restante do script)
}
</script>

<style scoped>
/* Estilos específicos para o tema escuro */
.dark-theme {
  background-color: #373636;
  color: #c6c6c6;
}

.t1 {
  color: white;
}
</style>
