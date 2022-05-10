<template>
  <div class="userContainer_up">
    <div class="imgContainer_up" v-if="title === 'Login'">
      <img
        class="img_up"
        src="https://images.pexels.com/photos/952670/pexels-photo-952670.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <span>Welcome</span>
    </div>
    <div class="title_up">{{ title }}</div>
    <form class="userForm_up" @submit="formSubmit">
      <slot> </slot>
      <button class="userMainButton_up" type="submit">{{ buttonName }}</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["title", "buttonName"],
  setup(props, context) {
    const formSubmit = (e) => {
      e.preventDefault();
      context.emit("formSubmit");
    };

    return { formSubmit };
  },
};
</script>

<style>
.userContainer_up {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  background-color: white;
}

.userContainer_up:not(:last-child) {
  border-right: 2px solid #f3f6f4;
}

.imgContainer_up {
  position: relative;
}

.imgContainer_up > span {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: white;
  height: fit-content;
  width: fit-content;
  font-size: 2rem;
}

.img_up {
  border-radius: 1rem;
  width: 100%;
  object-fit: contain;
  margin-bottom: 1rem;
}

.title_up {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.userForm_up {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  flex-grow: 1;
}

.inputField_up {
  flex-grow: 1;
  margin-bottom: 1.5rem;
}

.controlContainer_up {
  width: 100%;
}

.controlContainer_up:not(:last-child) {
  margin-bottom: 1rem;
}

.controlContainer_up > label {
  margin-bottom: 1rem;
  display: block;
}

.controlContainer_up > input {
  padding: 0.5rem;
  width: 100%;
  border: 2px solid #f3f6f4;
  border-radius: 0.5rem;
}

.userMainButton_up {
  width: 100%;
  padding: 1rem;
  border: none;
  background-color: #f3f6f4;
  cursor: pointer;
}

.userMainButton_up:hover {
  background-color: #eeeeee;
}
</style>
