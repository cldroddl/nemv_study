<template>
  <v-container
  class="fill-height"
  fluid
  >
    <v-row
      align-center
      justify-center
    >
      <v-col class="text-center">
        Baseline
      </v-col>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-col class="text-center">
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn
              :to="{ name: '/' }"
              icon
              large
              target="_blank"
              v-on="on"
            >
              <v-icon>home</v-icon>
            </v-btn>
          </template>
          <span>Home</span>
        </v-tooltip>

        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              large
              :to="'/about'"
              target="_blank"
              v-on="on"
            >
              <v-icon>help_outline</v-icon>
            </v-btn>
          </template>
          <span>About</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
</template>
