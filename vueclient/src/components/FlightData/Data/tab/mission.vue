<template>
  <div class="main">
    <mermaid
      v-if="isReloadData"
      :nodes="data"
      type="graph TB"
      @nodeClick="editNode"
    ></mermaid>
    <button @click="change">color</button>
  </div>
</template>
<script>
import mermaid from './mermaid'
export default {
  data() {
    return {
      isReloadData: true,
      color: [],
      data: [],
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
      this.data = [
        {
          id: '1',
          text: 'mission 1',
          link: '---',
          next: ['2', '3'],

          editable: true,
          style: 'fill:,stroke:#333,stroke-width:4px',
          color: this.color[1],
        },
        {
          id: '2',
          text: 'charge',
          edgeType: 'circle',

          editable: true,
          style: 'fill:,stroke:#333,stroke-width:4px',
          color: this.color[2],
        },
        {
          id: '3',
          text: 'Action',
          next: ['4', '5', '6'],
          editable: true,
          style: 'fill:,stroke:#333,stroke-width:4px',
          color: this.color[3],
        },
        {
          id: '4',
          text: 'Cover and search',
          editable: true,
          style: 'fill:,stroke:#333,stroke-width:4px',
          color: this.color[4],
        },
        {
          id: '5',
          text: 'communication',
          editable: true,
          style: 'fill:,stroke:#333,stroke-width:4px',
          color: this.color[5],
        },
        {
          id: '6',
          text: 'attack',
          editable: true,
          style: 'fill:,stroke:#333,stroke-width:4px',
          color: this.color[6],
        },
      ]
    },
    change() {
    //   this.color[2]
      this.color[5] = 'red'
      console.log(this.color[2])
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