<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      align-center
      justify-center
    >
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-btn
            :to="{ name : 'home' }"
            icon
            large
            v-on="on"
          >
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
            :to="{ name : 'about' }"
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
