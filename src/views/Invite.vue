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
        <a-col :span="22"><p class="title-navbar">Invite Friend</p></a-col>
      </a-row>
    </div>
    <a-row class="search">
      <a-col :span="17" class="header-logo">
        <a-input
          placeholder="Type for finding a contact"
          size="large"
          v-model="inputSearch"
          v-on:keyup.enter="searchContact()"
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
      <!-- <div class="contact-list" v-for="(item, index) in contacts" :key="index"> -->
      <div class="contact-list">
        <div>
          <a-row>
            <a-col :span="3" class="photo"> </a-col>
            <div class="result-invite" v-show="result">
              <a-col :span="3" class="photo">
                <div class="information">
                  <img v-bind:src="urlApi + resultContact.user_image" alt />
                </div>
              </a-col>
              <a-col :span="15" class="details">
                <a-row>
                  <a-col :span="12">
                    <p class="details-name">
                      <b>{{ resultContact.user_nickname }}</b>
                    </p>
                  </a-col>
                  <a-col :span="12">
                    <a-button class="contact-button" @click="addContact()">
                      <p class="details-button">
                        <a-icon
                          v-show="clickAdd"
                          type="user-add"
                          size="large"
                          :style="{ fontSize: '20px', color: '#ffffff' }"
                        />
                        <a-icon
                          v-show="clickSuccess"
                          type="check"
                          size="large"
                          :style="{ fontSize: '20px', color: '#ffffff' }"
                        />
                      </p>
                    </a-button>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <p class="details-message">
                      @{{ resultContact.user_name }}
                    </p>
                  </a-col>
                </a-row>
              </a-col>
            </div>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Contact',
  components: {},
  data() {
    return {
      urlApi: process.env.VUE_APP_URL,
      inputSearch: '',
      resultContact: {},
      user: {},
      result: false,
      clickAdd: true,
      clickSuccess: false
    }
  },
  computed: {
    ...mapGetters(['userData'])
  },
  methods: {
    ...mapMutations([
      'setShowChat',
      'setShowChatroom',
      'setShowContact',
      'setShowInvite'
    ]),
    ...mapActions(['getContacts', 'searchContacts', 'addContacts']),
    searchContact() {
      const data = {
        user_name: this.inputSearch
      }
      this.searchContacts(data)
        .then((response) => {
          console.log(response)
          this.result = true
          this.clickAdd = true
          this.clickSuccess = false
          this.resultContact = response[0]
          console.log(this.resultContact)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addContact() {
      const data = {
        owner: this.userData.user_id,
        saved: this.resultContact.user_id
      }
      console.log(data)
      this.addContacts(data)
        .then((response) => {
          this.clickAdd = false
          this.clickSuccess = true
          this.getContacts()
        })
        .catch((error) => {
          console.log(error)
        })
    }
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

.contact-button {
  margin-top: 15px;
  background-color: #7e98df;
  border-radius: 10px;
  height: 30px;
}

.contact-button-delete {
  margin-top: 10px;
  background-color: #c70323;
  border-radius: 10px;
  height: 30px;
}

.details-button {
  padding-top: 5px;
  color: #ffffff;
}

@media only screen and (max-width: 766px) {
  .search-box {
    margin-left: 50px;
  }

  .details-name {
    margin-top: 70px;
    margin-left: -40px;
    text-align: center;
  }

  .details-message {
    margin-left: -10px;
  }
}
</style>
