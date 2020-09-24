<template>
  <div class="menu">
    <!-- HEADER -->
    <a-row>
      <a-col :span="3" class="photo">
        <div class="information">
          <img src="https://oshiprint.in/image/data/poster/new/mqp114.jpeg" alt />
        </div>
      </a-col>
      <a-col :span="18" class="details">
        <a-row>
          <a-col :span="18">
            <p class="details-name">
              <b>Jean Alfredo Oliver</b>
            </p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="18">
            <p class="details-message">online</p>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="3" class="photo">
        <a-icon
          type="appstore"
          class="menu-icon-plus"
          :style="{ fontSize: '27px', color: '#7E98DF' }"
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
</style>
