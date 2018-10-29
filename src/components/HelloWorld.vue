<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Задайте вопрос, на который можно ответить "да" или "нет":
      <input v-model="question">
    </p>
    <p v-bind:style="{ margin: margin1 + 'px' , padding: '10' }">{{ answer }}</p>
    <template v-if="imgUrl" >
      <img v-bind:src="imgUrl" v-bind:alt="answer">
    </template>
  </div>
</template>

<script>

    import {capitalize, debounce} from 'lodash';
    import axios from 'axios';

    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data: function() {
            return {
                imgUrl: '',
                question: '',
                answer: 'Пока вы не зададите вопрос, я не могу ответить!',
                margin1: 10
            }
        },
        watch: {
            // эта функция запускается при любом изменении вопроса
            question: function (newQuestion, oldQuestion) {
                console.log(newQuestion, oldQuestion)
                this.answer = 'Ожидаю, когда вы закончите печатать...';
                this.imgUrl = '';
                this.debouncedGetAnswer()
            }
        },
        created: function () {
            this.debouncedGetAnswer = debounce(this.getAnswer, 500)
        },
        methods: {
            getAnswer: function () {
                if (this.question.indexOf('?') === -1) {
                    this.answer = 'Вопросы обычно заканчиваются вопросительным знаком. ;-)';
                    return
                }
                this.answer = 'Думаю...';
                var vm = this;
                axios.get('https://yesno.wtf/api')
                    .then(function (response) {
                        vm.answer = capitalize(response.data.answer);
                        vm.imgUrl = response.data.image;
                    })
                    .catch(function (error) {
                        vm.answer = 'Ошибка! Не могу связаться с API. ' + error
                    })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>