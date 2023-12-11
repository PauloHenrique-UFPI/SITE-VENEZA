<template>
  <q-page
    class="flex flex-center"
    :style="{
      backgroundImage: `url(${require('../assets/pizza4.jpg')})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
  >

    <div>
      <div>
        <q-item-label header align="center" class="custom-header-label3">
          Pedidos Prontos
        </q-item-label>
      </div>

      <q-list bordered class="rounded-borders" style="max-width: 600px; overflow-y: auto; max-height: 400px;">
        <q-item
          v-for="(pedido, index) in pedidosFiltrados"
          :key="index"
          class="q-mb-xl"

          style="background-color: aliceblue; border-radius: 30px; width: 400px; margin-bottom: 12px;"
        >
          <q-item-section top class="col-2 gt-sm">
            <q-avatar :color="getAvatarColor(pedido.status)" text-color="white" class="custom-avatar">
            </q-avatar>
          </q-item-section>

          <q-item-section top>
            <q-item-label lines="1">
              <span class="text-grey-8">{{ pedido.id }} - {{ pedido.nomeCliente }}</span>
            </q-item-label>
            <q-item-label caption lines="1">
              {{ pedido.tipo }} - {{ pedido.tamanho }}
            </q-item-label>
            <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
              <span class="cursor-pointer" @click="abrirDetalhesPedido(pedido)">Detalhar Pedido</span>
            </q-item-label>
          </q-item-section>

          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="search"
                @click="abrirDetalhesPedido(pedido)"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-list>

      <q-dialog v-model="dialogDetalhesPedido">
        <q-card>
          <q-card-section>
            <h3 class="titulo-pizza">Pizza de {{ pedidoSelecionado.tipo }}</h3>
            <div>
              <p>Nome do Cliente: {{ pedidoSelecionado.nomeCliente }}</p>
              <p>Tamanho: {{ pedidoSelecionado.tamanho }}</p>
              <p>ID do Pedido: {{ pedidoSelecionado.id }}</p>
              <p>Complemento: {{ pedidoSelecionado.complemento }}</p>
              <p>Preço: R$ {{ pedidoSelecionado.preco }}</p>
              <p>Troco: R$ {{ pedidoSelecionado.troco }}</p>
              <p>Endereco: {{ pedidoSelecionado.endereco }}</p>
              <p>Contato: {{ pedidoSelecionado.contato }}</p>
              <p>Status: {{ pedidoSelecionado.status }}</p>
            </div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn label="Fechar" color="orange" @click="fecharDetalhesPedido" />
            <q-btn label="Pronto para Envio" color="green" @click="submitFormStatus" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  data () {
    return {
      pedidos: [],

      tipo: '',
      tamanho: '',
      complemento: 'Não',
      preco: '',
      troco: '0000',
      endereco: '',
      nomeCliente: '',
      contato: '',
      status: 'on',

      optionsP: [
        'Calabresa', 'Portuguesa', 'Marguerita', 'Muçarela', 'Napolitana'
      ],
      optionsT: [
        'P', 'M', 'G', 'GG'
      ],

      pedidoSelecionado: {},
      dialogDetalhesPedido: false,
      dialogAdicionarPedido: false,
      confirmarExclusao: false
    }
  },
  mounted () {
    this.carregar()
  },
  computed: {
    pedidosFiltrados () {
      return this.pedidos.filter(pedido => pedido.status === 'entrega')
    }
  },
  methods: {
    async carregar () {
      const token = localStorage.getItem('token')
      try {
        const response = await api.get('/todos-pedidos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.pedidos = response.data.groups.sort((a, b) => a.id - b.id)
        this.isLoading = false
      } catch (error) {
        console.log(error)
        this.isLoading = false
      }
    },
    abrirDetalhesPedido (pedido) {
      this.pedidoSelecionado = pedido
      this.dialogDetalhesPedido = true
    },
    fecharDetalhesPedido () {
      this.pedidoSelecionado = {}
      this.dialogDetalhesPedido = false
    },
    async deletarPedido (pedidoId) {
      this.confirmarExclusao = true
      this.pedidoSelecionado = { id: pedidoId }
    },

    abrirAddPedido () {
      this.dialogAdicionarPedido = true
    },

    fecharAddPedido () {
      this.tipo = ''
      this.tamanho = ''
      this.complemento = 'Não'
      this.preco = ''
      this.troco = '0000'
      this.endereco = ''
      this.nomeCliente = ''
      this.contato = ''
      this.dialogAdicionarPedido = false
    },

    cancelarExclusao () {
      this.confirmarExclusao = false
      this.pedidoSelecionado = {}
    },

    async confirmarExclusaoPedido () {
      this.confirmarExclusao = false

      const token = localStorage.getItem('token')
      try {
        await api.delete(`/deletar-pedido/${this.pedidoSelecionado.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.carregar()
      } catch (error) {
        console.error('Erro ao deletar o pedido', error)
      }

      this.pedidoSelecionado = {}
    },

    async submitFormStatus () {
      try {
        this.loading = true
        const token = localStorage.getItem('token')
        const formData = new FormData()
        console.log(this.pedidoSelecionado.id)

        formData.append('status', 'entrega')

        await api.put(`/alterar-pedido/${this.pedidoSelecionado.id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        this.fecharDetalhesPedido()
        this.carregar()
      } catch (error) {
        this.persistent = true
        this.loading = false
      } finally {
        this.loading = false
      }
    },

    getAvatarColor (status) {
      switch (status) {
        case 'on':
          return 'green'
        case 'preparando':
          return 'orange'
        case 'entrega':
          return 'yellow'
        case 'finalizado':
          return 'blue'
        case 'cancelado':
          return 'red'

        default:
          return 'orange'
      }
    }

  }
})
</script>

<style>
.custom-header-label3 {
  font-size: 24px;
  font-family: 'Courier New';
  font-weight: bold;
  padding: 10px;
  border: 10px solid #FFA500;
  background-color: orangered;
  border-radius: 10px;
  color: #000000;
  margin-bottom: 20px;
}

.custom-avatar {
  width: 40px;
  height: 40px;
  font-size: 18px;
}

.add{
  position: fixed;

  left:85%;
  top: 85%;
  z-index: 2;

}

.titulo-pizza{
  font-size: 24px;
  font-family: 'Courier New';
  font-weight: bold;
  border: 10px solid #FFA500;
  border-radius: 10px;
  color: #000000;
  margin-bottom: 20px;
  padding: 12px;
}

.inputs-container {
    display: flex;
    justify-content: space-between;
  }

  .input-spacing {
    margin-right: 10px;
  }
</style>
