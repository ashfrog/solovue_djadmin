<template>
  <div v-if="show" :class="{'video-modal':true,'show':show}" @click.stop="close">
    <div :class="{'modal-body':true}" @click.stop="">
      <video :key="src" ref="video" class="video" controls="controls" autoplay>
        <source :src="src" type="video/mp4" />
      </video>
      <div class="close" @click="close">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconguanbi"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MVideo',
    props: {
      src: {
        default: ""
      },
      show: {
        type: Boolean,
        default: true
      }
    },

    methods: {
      close() {
        this.$emit('close');
      }
    },
    data() {
      return {

      }
    }
  }
</script>

<style>
  .modal-body {
    position: absolute;
    width: 57.29%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #000;
  }

  .video-modal {
    display: none;
    overflow: hidden;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    -webkit-overflow-scrolling: touch;
    outline: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
    color: #FFF;
  }

  .modal-body .video {
    width: 100%;
  }

  .show {
    display: block;
  }

  .modal-body .close {
    position: absolute;
    right: 16px;
    top: 10px;
    color: #FFF;
    font-size: 30px;
    cursor: pointer;
  }

  .video {
    outline: none;
  }

  audio,
  canvas,
  progress,
  video {
    display: inline-block;
    vertical-align: baseline;
  }

  @media (max-width: 1200px) {
    .modal-body {
      width: 88%;
    }
  }
</style>
