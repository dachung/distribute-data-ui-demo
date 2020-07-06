<template>
  <a-layout id="matching-demo-ui">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-row type="flex" justify="end">
          <a-col :span="1"></a-col>
        </a-row>
      </a-menu>
    </a-layout-header>
    <a-layout>
        <a-layout-content class="content">
          <nuxt />
        </a-layout-content>
    </a-layout>
    <a-layout-footer class="footer">Data Distributor UI Demo ©2020 Created by Harry Phung. <a href="http://dachung.xyz">https://dachung.xyz</a></a-layout-footer>
  </a-layout>
</template>

<style>
.content {
  min-height: calc(100vh - 128px);
}
.footer {
  text-align: center;
  height: 64px;
}
</style>
