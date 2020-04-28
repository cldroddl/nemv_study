<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      align-center
      justify-center
    >
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn
            :href="'/'"
            icon
            large
            v-on="on"
          >
          <!-- href 대신 :to를 사용해서 하면 잘 되는데 아이콘 옆에 그림자가 생긴다. -->
          <!-- :to="{name : 'home'}" -->
          <!-- 하지만 href는 객체를 인식하지 못한다. -->
          <!-- :href="{name: 'home'}"  X  -->
            <v-icon large>home</v-icon>
          </v-btn>
        </template>
        <span>Home</span>
      </v-tooltip>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            large
            :href="'/about'"
            v-on="on"
          >
            <v-icon large>help</v-icon>
          </v-btn>
        </template>
        <span>About</span>
      </v-tooltip>
    </v-layout>
  </v-container>
</template>

<script>
export default {
}
</script>
