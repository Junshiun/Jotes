<template>
  <div class="pageWrap_hp">
    <div class="wallpaperWrap_hp">
      <img
        class="wallpaper_hp"
        src="https://images.pexels.com/photos/442574/pexels-photo-442574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <div class="mainInfo_hp">
        <span class="title">Create Your Notes in Jotes</span>
        <span>Login or Sign Up</span>
        <router-link :to="{ name: 'userMain' }" class="linkButton"
          >Here</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homePage",
};
</script>

<style scoped>
.pageWrap_hp {
  height: calc(100vh - var(--header-height));
  width: 100vw;
  overflow-y: scroll;
  overflow-x: hidden;
}

.wallpaperWrap_hp {
  position: relative;
  margin: 0;
  height: fit-content;
}

.wallpaper_hp {
  height: calc(100vh - var(--header-height));
  width: 100%;
  object-fit: cover;
  min-height: 30rem;
}

.mainInfo_hp {
  position: absolute;
  margin: 0 auto 0 auto;
  width: fit-content;
  height: fit-content;
  top: 20%;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
}

.mainInfo_hp > .title {
  display: block;
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 2rem;
}

.mainInfo_hp > .linkButton {
  margin-left: 1rem;
  border-radius: 10px;
  padding: 0.5rem 1rem 0.5rem 1rem;
  background-color: black;
  color: #eeeeee;
  text-decoration: none;
}
</style>
