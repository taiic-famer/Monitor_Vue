<template>
  <div class="main">
    <iframe
      src="http://192.168.81.41:32007/d/3138fa155d5915769fbded898ac09fd9/kubernetes-kubelet?orgId=1&kiosk"
      width="100%"
      height="100%"
      frfameborder="0"
    ></iframe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['name']),
  },
}
</script>

<style  scoped>
.main {
  /* width: 1680px;
  height: 890px; */
  min-width: 1680px;
  height: 920px;
}
</style>
