<template>
  <div class="menu">
    <!-- HEADER -->
    <a-row>
      <a-col :span="18" class="header-logo">
        <p>Chatchy</p>
      </a-col>
      <a-col :span="6" class="header-menu">
        <a-icon
          type="align-right"
          class="menu-icon"
          :style="{ fontSize: '23px', color: '#7E98DF' }"
        />
      </a-col>
    </a-row>

    <!-- SEARCH -->
    <a-row class="search">
      <a-col :span="17" class="header-logo">
        <a-input
          placeholder="search or start new chat"
          size="large"
          @search="onSearch"
          class="search-box"
        />
      </a-col>
      <a-col :span="6" class="header-menu">
        <a-icon type="plus" class="menu-icon-plus" :style="{ fontSize: '27px', color: '#7E98DF' }" />
      </a-col>
    </a-row>
    <!-- MESSAGE INDICATOR -->
    <a-row>
      <a-col :span="8" class="indicator" @click="isActive">All</a-col>
      <a-col :span="8" class="indicator" @click="isActive">Important</a-col>
      <a-col :span="8" class="indicator" @click="isActive">Unread</a-col>
    </a-row>
    <div class="card-container">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '../components/Card'

export default {
  name: 'Menu',
  components: {
    Card
  },
  methods: {
    // eslint-disable-next-line space-before-function-paren
    onSearch(value) {
      console.log(value)
    }
    // eslint-disable-next-line space-before-function-paren
  }
}
</script>

<style scoped>
.header-logo p {
  width: 128px;
  height: 34px;
  padding-top: 20px;
  padding-left: 30px;

  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 29px;
  line-height: 34px;
  text-align: center;
  letter-spacing: -0.165px;

  color: #7e98df;
}

/* .header-menu {
  background-color: mediumslateblue;
} */

.menu {
  background-color: #ffffff;
}

.menu-icon {
  padding-top: 20px;

  border-radius: 20px;
}

.menu-icon-plus {
  padding-top: 7px;
  padding-left: 25px;
}

.box {
  height: 120px;
  background-color: limegreen;
}

.search-box {
  margin-left: 25px;
  border-radius: 20px;
}

.ant-input {
  border-radius: 15px !important;
}

.search {
  margin: 15px 0;
}

.indicator {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 50px;
  /* identical to box height */

  text-align: center;
  letter-spacing: -0.165px;

  color: #848484;
  border-radius: 20px;
}

.indicator:hover {
  background-color: #7e98df;
  color: white;
  cursor: pointer;
}

.indicator:active {
  background-color: #7e98df;
  color: white;
  cursor: pointer;
}

.card-container {
  height: 430px;
  overflow-y: scroll;
}

.card-container::-webkit-scrollbar {
  display: none;
}
</style>
