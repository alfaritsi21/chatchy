<template>
  <div class="chat">
    <Navbar />
    <div class="chat-room">
      <BalloonSender class="balloon-sender" />
      <BalloonReceiver class="balloon-receiver" />
      <BalloonSender class="balloon-sender" />
      <BalloonReceiver class="balloon-receiver" />
      <BalloonSender class="balloon-sender" />
      <BalloonReceiver class="balloon-receiver" />
      <BalloonSender class="balloon-sender" />
      <BalloonReceiver class="balloon-receiver" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/chat/Navbar'
import Footer from '../components/chat/Footer'
import BalloonSender from '../components/chat/BalloonSender'
import BalloonReceiver from '../components/chat/BalloonReceiver'

export default {
  name: 'Chatroom',
  components: {
    Navbar,
    Footer,
    BalloonSender,
    BalloonReceiver
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.chat-room {
  overflow-y: scroll;
}

.chat-room::-webkit-scrollbar {
  display: none;
}

.chat {
  height: 629px;
}

.chat-room {
  height: 450px;
  padding: 30px;
  background-color: #fafafa;
}

.balloon-sender {
  margin: 10px 0;
}

.balloon-receiver {
  margin: 10px 0;
}
</style>
