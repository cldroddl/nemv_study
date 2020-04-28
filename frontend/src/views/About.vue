<template>
  <v-container
    fluid
    class="grey lighten-4 fill-height"
  >
    <v-row
      justify="center"
      align="center"
    >
      <v-col class="shrink">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn
              :to="'/'"
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
              :to="'/about'"
              icon
              large
              v-on="on"
            >
              <v-icon large>help</v-icon>
            </v-btn>
          </template>
          <span>About</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
}
</script>
