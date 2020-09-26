<template>
  <div class="menu">
    <!-- HEADER -->
    <a-row>
      <a-col :span="20">
        <div class="components-input-demo-size message-area">
          <a-input
            size="large"
            placeholder="Type a message"
            class="input-message"
          />
        </div>
      </a-col>
      <a-col :span="1">
        <a-icon
          type="plus"
          :style="{ fontSize: '25px', color: '#7E98DF' }"
          class="message-send"
        />
      </a-col>
      <a-col :span="1">
        <a-icon
          type="smile"
          :style="{ fontSize: '25px', color: '#7E98DF' }"
          class="message-send"
        />
      </a-col>
      <a-col :span="1">
        <a-icon
          type="arrow-right"
          :style="{ fontSize: '30px', color: '#7E98DF' }"
          class="message-send"
        />
      </a-col>
    </a-row>
  </div>
</template>

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
  padding-top: 24px;
}

.details-name {
  margin-top: 10px;
  margin-bottom: 5px;
}

.information {
  margin-bottom: 10px;
}

.input-message {
  margin: 10px 0;
  padding: 20px 0 20px 20px 20px;
  border-radius: 15px;
}

.message-area {
  border-radius: 15px 15px 0 0;
  padding: 15px 0 15px 30px;
  background-color: white;
}

.message-send {
  padding-top: 35px;
}
</style>
