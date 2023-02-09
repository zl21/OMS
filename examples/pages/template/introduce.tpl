<style scoped>
  .page-introduce {
    padding: 55px 30px 95px;
    margin: 0 150px;

    h3 {
      font-size: 22px;
      font-weight: normal;
      margin: 0 0 30px;
      color: #1f2d3d;
    }
    
    ul {
      list-style-type: disc;
      margin-bottom: 50px;
      padding-left: 0;

      li {
        font-size: 14px;
        margin-bottom: 10px;
        color: #99a9bf;

        strong {
          color: #5e6d82;
          font-weight: 400;
        }
      }
    }
  }
</style>
<template>
  <div class="page-introduce">
    <h3>
      <router-link active-class="active" :to="`/zh-CN/docs-dom/installation`">OMS-UI</router-link>
    </h3>
    <ul>
      <li><strong>是上海伯俊中台事业部产品中心项目架构私有依赖包仓库中复合型业务组件库；</strong></li>
      <li><strong>秉承前端项目工程化的思想, 将中台项目中公用的业务组件库抽离, 独立模块依赖包便于后期迭代维护。</strong></li>
    </ul>
    <h3>
      <router-link active-class="active" :to="`/zh-CN/docs-theme/introduce`">OMS-Theme</router-link>
    </h3>
    <ul>
      <li><strong>是上海伯俊中台事业部产品中心项目架构私有依赖包仓库中主题样式库；</strong></li>
      <li><strong>满足后期更多客户定制化样式主题的需求及更好的适配产品化项目；</strong></li>
      <li><strong>秉承前端项目工程化的思想, 将中台项目中主题样式库抽离, 独立模块依赖包便于后期迭代维护。</strong></li>
    </ul>
    <h3>
      <router-link active-class="active" :to="`/zh-CN/docs-dom/i18n`">OMS-I18n</router-link>
    </h3>
    <ul>
      <li><strong>是上海伯俊中台事业部产品中心项目架构私有依赖包仓库中针对于后期的海外用户有国际化需求开发的语言包功能模块。</strong></li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        a: ''
      };
    }
  };
</script>
