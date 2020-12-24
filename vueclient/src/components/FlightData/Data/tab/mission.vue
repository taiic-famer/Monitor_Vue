<template>
  <div class="main">
    <mermaid :nodes="data" type="graph TB" @nodeClick="editNode"></mermaid>
    <button @click="change(0)">0</button>
    <button @click="change(1)">1</button>
    <button @click="change(2)">2</button>
    <button @click="change(3)">3</button>
    <button @click="change(4)">4</button>
    <button @click="change(5)">5</button>
  </div>
</template>
<script>
import mermaid from './mermaid'
export default {
  data() {
    return {
      color: [],
      data: [
        {
          id: '0',
          text: 'mission 1',
          next: ['1', '2'],
        },
        {
          id: '1',
          text: 'charge',
          edgeType: 'circle',
        },
        {
          id: '2',
          text: 'Action',
          next: ['3', '4', '5'],
        },
        {
          id: '3',
          text: 'Cover and search',
        },
        {
          id: '4',
          text: 'communication',
        },
        {
          id: '5',
          text: 'attack',
        },
      ],
    }
  },
  components: {
    mermaid,
  },
  mounted() {
    this.init()
  },

  methods: {
    init() {
      for (let i = 0; i < this.data.length; i++) {
        this.$set(this.data[i], 'link', '-->')
        this.$set(this.data[i], 'editable', true)
        this.$set(this.data[i], 'style', 'fill:,stroke:#333,stroke-width:4px')
        this.$set(this.data[i], 'color', this.color[i])
      }
      // console.log(this.data)
    },
    change(n) {
      for (let i = 0; i < this.data.length; i++) {
        if (i == n) {
          this.color[i] = 'red'
        } else {
          this.color[i] = ''
        }
      }
      this.init()
    },
    
    editNode(node) {
      let num = this.data.length
      this.color[2] = 'red'
      console.log(this.color[2])
    },

    reload() {
      this.isReloadData = false
      this.$nextTick(() => {
        this.isReloadData = true
      })
    },
  },
}
</script>
<style scoped>
.main {
  height: 570px;
}
</style>