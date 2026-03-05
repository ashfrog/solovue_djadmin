<template>
  <div class="profile-edit-container">
    <iframe
      :src="iframeSrc"
      class="profile-edit-iframe"
      allowfullscreen
    />
  </div>
</template>

<script>
export default {
  name: 'ProfileEdit',
  computed: {
    iframeSrc() {
      return process.env.BASE_URL + 'h5/profile_edit.html'
    }
  }
}
</script>

<style scoped>
.profile-edit-container {
  width: 100%;
  height: calc(100vh - 84px);
  overflow: hidden;
}
.profile-edit-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
