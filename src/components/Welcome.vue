<!-- src/components/Welcome.vue -->
<template>
    <div class="welcome-page">
      <h1>欢迎来到学生管理系统</h1>
      <p>This is the welcome page content.</p>
    </div>
  </template>
  
  <script setup>
  // 可以根据需要导入其他必要的功能模块
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  
  .welcome-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, rgb(253, 171, 208), rgb(253, 192, 203));
    color: #fff;
    font-family: 'Roboto', sans-serif;
    text-align: center;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .welcome-page h1 {
    font-size: 3em;
    margin: 0.2em 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .welcome-page p {
    font-size: 1.5em;
    margin: 0.5em 0;
    max-width: 600px;
    line-height: 1.4;
  }
  </style>
  