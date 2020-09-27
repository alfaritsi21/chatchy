<template>
  <div class="contact">
    <div class="contact-navbar">
      <a-row>
        <a-col :span="2">
          <a-icon
            type="left"
            :style="{ fontSize: '18px', color: '#ffffff' }"
            @click="setShowChat"
          />
        </a-col>
        <a-col :span="22"><p class="title-navbar">Invite a Friend</p></a-col>
      </a-row>
    </div>
    <a-row class="search">
      <a-col :span="17" class="header-logo">
        <a-input
          placeholder="Type for finding a contact"
          size="large"
          @search="onSearch"
          class="search-box"
        />
        <a-icon
          class="email-form"
          slot="prefix"
          type="search"
          style="color: rgba(0, 0, 0, 0.25)"
        />
      </a-col>
    </a-row>
    <div class="body-contact">
      <div class="contact-list"></div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Contact',
  components: {},
  methods: {
    ...mapMutations([
      'setShowChat',
      'setShowChatroom',
      'setShowContact',
      'setShowInvite'
    ])
  }
}
</script>

<style scoped>
.contact {
  height: 625px;
  /* overflow-y: scroll; */
}

/* .contact::-webkit-scrollbar {
  display: none;
} */

.body-contact {
  height: 550px;
  overflow-y: scroll;
}

.body-contact::-webkit-scrollbar {
  display: none;
}

.contact-navbar {
  height: 60px;
  background: #7e98df;
  border-radius: 0 0 10px 10px;
  padding: 20px;
}

.title-navbar {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  letter-spacing: -0.165px;

  color: #ffffff;
}

.contact-list {
  margin: 40px 60px;
}

.search-box {
  margin-left: 160px;
  border-radius: 20px;
  text-align: center;
}

.ant-input {
  border-radius: 15px !important;
}

.search {
  margin: 15px 0;
}
</style>
