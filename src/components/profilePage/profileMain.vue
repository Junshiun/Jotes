<template>
  <profileTemplate v-if="user" type="main">
    <router-link :to="{ name: 'profileEdit' }" class="editButton"
      ><i class="bi bi-pencil-square"></i
    ></router-link>
    <div class="relativeImgContainer">
      <div class="imgContainer">
        <img class="profileImage" src="/avatar1.png" />
        <i class="bi bi-image-alt"
          ><a href="https://www.freepik.com/vectors/teenager" target="_blank"
            >Teenager vector created by studiogstock - www.freepik.com</a
          ></i
        >
      </div>
    </div>
    <span class="nameSpan">{{ user.name }}</span>
    <span>Email: {{ user.email }}</span>
    <span v-if="notes"> Total notes: {{ notes.length }}</span>
  </profileTemplate>
</template>

<script>
import profileTemplate from "./profileTemplate.vue";
export default {
  components: {
    profileTemplate,
  },
  props: ["user", "notes"],
  setup() {},
};
</script>

<style>
.profileContainer_pp .editButton {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.profileContainer_pp span {
  display: block;
  margin-bottom: 1rem;
}

.profileContainer_pp .hiSpan,
.profileContainer_pp .nameSpan {
  margin: 0 auto 0 auto;
  width: fit-content;
}

.profileContainer_pp .nameSpan {
  margin-bottom: 3rem;
}

.profileContainer_pp .relativeImgContainer {
  position: relative;
}

.profileContainer_pp .imgContainer {
  margin: 2rem auto 2rem auto;
  height: 8rem;
  width: 8rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: #eeeeee;
}

.profileContainer_pp .imgContainer > i {
  bottom: 1rem;
  right: 4rem;
  position: absolute;
  color: white;
}

.profileContainer_pp i > a {
  display: none;
}

.profileContainer_pp .imgContainer > i:hover > a {
  display: block;
  width: fit-content;
  background-color: black;
  color: white;
  padding: 1rem;
  text-align: justify;
  border-radius: 0.5rem;
}

.profileContainer_pp .profileImage {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.profileContainer_pp .deleteButton {
  border: 1px solid #990000;
  border-radius: 10px;
  margin-top: 2rem;
}
</style>
