<template>
    <md-app v-if="login" class="app-main" md-mode="fixed">
        <md-app-toolbar class="md-primary" >
            <span class="md-title" style="flex: 1">VueBook</span>
            Hello, {{login}}!
            <md-button class="md-icon-button" @click="logOut">
                <md-icon>exit_to_app</md-icon>
            </md-button>
        </md-app-toolbar>
        <md-app-content class="app-container">
            <!--<div style="min-width: 1000px;margin: 0 auto;">-->
                <div class="messages-container">
                    <md-content class="md-scrollbar messages" id='messageDisplay'>
                        <md-card v-for="{author, id, value, created} in messages" :key="id" class="message">
                            <md-card-header>
                                <md-icon>account_circle</md-icon> {{author}} <span class="time">at {{new Date(created.seconds * 1000).toLocaleTimeString()}}</span>
                            </md-card-header>
                            <md-card-content>
                                {{ value }}
                            </md-card-content>
                            <md-button @click="deleteMessage(id)" class="md-icon-button md-accent delete-btn">
                                <md-icon>clear</md-icon>
                            </md-button>

                        </md-card>
                    </md-content>
                </div>
                <div class="outer">
                    <md-field>
                        <label>Text message</label>
                        <md-textarea
                            v-model="newMessage"
                            autofocus
                            autocomplete="off"
                            @keydown.ctrl.enter="newMessage+= '\n'"
                            @keydown.enter.stop.prevent
                            @keyup.enter.exact.stop.prevent="sendMessage"
                        />
                    </md-field>
                    <md-button
                        class="md-icon-button md-raised md-primary send-btn"
                        @click="sendMessage"
                    >
                        <md-icon>send</md-icon>
                    </md-button>
                </div>
            <!--</div>-->
        </md-app-content>
    </md-app>
<Login v-else @set-login="login = $event"/>

</template>


<script>
import Login from "./Login";
import { logOut } from "./auth";
import firebase from "./firebase";

export default {
  name: "Chat",
  components: {
    Login
  },
  data: () => ({
    menuVisible: false,
    newMessage: "",
    messages: [],
    login: null
  }),
  created: function() {
    firebase
      .collection("messages")
      .orderBy("created", "desc")
      .onSnapshot(querySnapshot => {
        this.messages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      });
  },
  mounted() {
    this.scrollToEnd();
  },
  methods: {
    logOut() {
      this.login = "";
      logOut();
    },
    scrollToEnd: function() {
      const container = document.querySelector("#messageDisplay");
      if (container) {
        const { scrollHeight } = container;
        container.scrollTo(0, scrollHeight);
      }
    },
    sendMessage: function() {
      const value = this.newMessage && this.newMessage;
      if (!value) {
        return;
      }
      firebase
        .collection("messages")
        .add({
          author: this.login,
          value,
          created: new Date()
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      this.newMessage = "";
      this.scrollToEnd();
    },
    deleteMessage: function(id) {
      firebase
        .collection("messages")
        .doc(id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    }
  }
};
</script>


<style scoped>
.app-main {
  min-height: 100%;
  height: 100vh;
}
.app-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.md-content {
    padding: 0 15px;
}
.messages-container {
  height: 100%;
  display: flex;
  flex-flow: column;
}
.messages {
    flex-direction: column-reverse;
  flex: 1 1 auto;
  display: flex;
  overflow-y: auto;
  margin: 15px 0!important;
  padding: 0!important;
}

.md-card {
  position: relative;
  margin: 1em 0;
  border-radius: 15px;
  box-shadow: 0 2px 25px -4px rgba(0, 0, 0, 0.19);
  transition: all 0.2s ease-out;
  cursor: pointer;
}
.md-card:hover {
  transform: translateY(2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05);
}
.md-card-header{
    padding: 15px;
    word-break: break-all;
}
.md-card-content {
    padding: 0 15px 15px!important;
  word-wrap: break-word;
}
@media (max-width: 600px) {
    .md-content {
        padding: 0 5px;
    }
    .md-card-content,
    .md-card-header{
        padding: 10px;
    }
    .md-card-content:last-of-type{
        padding-bottom: 12px;
    }
}
.delete-btn {
  position: absolute;
  top: 7px;
  right: 0;
}
.time {
  opacity: 0.3;
padding-left: 5px;
}

.outer {
  display: flex;
  padding: 15px;
}
.md-field {
  margin-top: 0;
}
.md-field textarea {
  min-height: 70px !important;
  resize: none !important;
}
.send-btn {
  transform: rotate(-45deg);
}
</style>
