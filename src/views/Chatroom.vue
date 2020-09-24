<template>
  <div class="chat">
    <Navbar />
    <div class="chat-room">aaa</div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/chat/Navbar'
import Footer from '../components/chat/Footer'

export default {
  name: 'Chatroom',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style scoped>
.chat {
  height: 629px;
}

.chat-room {
  height: 470px;
  background-color: #fafafa;
}
</style>
