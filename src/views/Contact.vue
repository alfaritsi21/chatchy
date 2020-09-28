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
        <a-col :span="22"><p class="title-navbar">My Contact</p></a-col>
      </a-row>
    </div>
    <a-row class="search">
      <a-col :span="17" class="header-logo">
        <a-input
          placeholder="Type for search contact"
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
      <div class="contact-list" v-for="(item, index) in contacts" :key="index">
        <div>
          <a-row>
            <a-col :span="3" class="photo">
              <div class="information">
                <img v-bind:src="urlApi + item.user_image" alt />
              </div>
            </a-col>
            <a-col :span="18" class="details">
              <a-row>
                <a-col :span="24">
                  <p class="details-name">
                    <b>{{ item.user_nickname }}</b>
                  </p>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24">
                  <p class="details-message">@{{ item.user_name }}</p>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
// import ContactList from '../components/ContactList'
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Contact',
  components: {
    // ContactList
  },
  data() {
    return {
      urlApi: process.env.VUE_APP_URL
    }
  },
  created() {
    this.getContacts()
  },
  computed: {
    ...mapGetters({
      contacts: 'getContactData'
    })
  },
  methods: {
    ...mapMutations([
      'setShowChat',
      'setShowChatroom',
      'setShowContact',
      'setShowInvite'
    ]),
    ...mapActions(['getContacts']),
    onSearch() {}
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
  height: 490px;
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
