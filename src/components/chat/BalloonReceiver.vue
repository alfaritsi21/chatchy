<template>
  <div>
    <a-row>
      <a-col :span="2">
        <img
          src="https://oshiprint.in/image/data/poster/new/mqp114.jpeg"
          alt=""
          class="image-receiver"
        />

        <!-- <a-card-meta title="Card title" description="This is the description">
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-card-meta> -->
      </a-col>
      <a-col :span="16" class="style-balloon"
        ><p class="text-chat">
          Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text
          Lorem Ipsum is simply dummy text
        </p></a-col
      >
    </a-row>
  </div>
</template>

<style scoped>
.image-receiver {
  width: 54px;
  height: 54px;
  left: 404px;
  top: 209px;

  border-radius: 20px;
}

.text-chat-receiver {
  text-align: left;
  padding: 0 20px;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 250%;
  /* or 28px */

  letter-spacing: -0.165px;

  color: #ffffff;
  background: #7e98df;
  border-radius: 10px 35px 35px 25px;
}

.style-balloon {
  margin-top: 10px;
}
</style>
