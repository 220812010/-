<!-- Home.vue -->

<template>
    <div class="home">
      <h1>Welcome to Our Project!</h1>
      <p>This is a simple welcome page for your project.</p>
      <router-link to="/user-list">
        <button class="btn">Go to User List</button>
      </router-link>
    </div>
  </template>
  
  <script setup>
  // 如果需要添加逻辑或数据处理，可以在此处添加
  </script>
  
  <style scoped>
  .home {
    text-align: center;
    margin-top: 100px;
  }
  
  .btn {
    background-color: #1677ff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
  }
  </style>
  