<template>
  <div class="main-comp">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
      <path fill="none" stroke="#0829FF" stroke-width="15" stroke-linecap="round" stroke-dasharray="300 385" stroke-dashoffset="0" d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z">
        <animate attributeName="stroke-dashoffset" calcMode="spline" dur="2" values="685;-685" keySplines="0 0 1 1" repeatCount="indefinite"></animate>
      </path>
    </svg>
  </div>
</template>

<script>
export default {
  name: "AppLoader"
};
</script>

<style scoped>
.main-comp {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  
  background-color: rgba(255, 255, 255, 0.8);
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  z-index: 9999;
}

svg {
  width: 150px; 
}
</style>