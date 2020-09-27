<template>
  <div class="card">
    <a-row>
      <a-col :span="8" class="photo">
        <div class="information">
          <img
            src="https://oshiprint.in/image/data/poster/new/mqp114.jpeg"
            alt
          />
        </div>
      </a-col>
      <a-col :span="16" class="details">
        <a-row>
          <a-col :span="18">
            <p class="details-name">
              <b>Jean Alfredo Oliver</b>
            </p>
          </a-col>
          <a-col :span="6">
            <p class="details-time">21:21</p>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="18">
            <p class="details-message">Mabar skuy</p>
          </a-col>
          <a-col :span="6">
            <a-badge
              count="109"
              :number-style="{ backgroundColor: '#7E98DF' }"
            />
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<style>
.card {
  border-radius: 20px;
  margin: 15px 0;
}

.card:hover {
  background-color: #e7e7e7;
  cursor: pointer;
}

.information {
  height: 70px;
}

.information img {
  margin: 8px;
  width: 64px;
  height: 64px;

  border-radius: 20px;
}

.details-name {
  font-family: Rubik;
  font-style: normal;
  text-align: left;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  letter-spacing: -0.165px;
  margin-top: 5px;

  color: #232323;
}

.details-time {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  padding-top: 10px;

  /* identical to box height */

  text-align: center;
  letter-spacing: -0.165px;

  color: #848484;
}

.details-message {
  font-family: Rubik;
  text-align: left;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 17px;
  letter-spacing: -0.165px;
  margin-bottom: 10px;

  color: #7e98df;
}

/* .details-notification {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  letter-spacing: -0.165px;
  background: lightseagreen;
  border-radius: 50%;

  color: #ffffff;
} */

.details {
  padding-top: 10px;
}
</style>
