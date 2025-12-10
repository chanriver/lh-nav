<template>
  <div class="featured-wrapper">
    <h2>精彩文章</h2>

    <button @click="batchDelete" v-if="selected.length">批量删除选中</button>

    <div v-if="loading" class="loading">加载中…</div>

    <div v-for="a in list" :key="a.url" class="article-card">
      <input type="checkbox" v-model="selected" :value="a.url" />
      <img class="favicon" :src="a.favicon || defaultIcon" />
      <a :href="a.url" target="_blank">{{ a.title }}</a>
      <span class="tag">{{ a.tag }}</span>
      <span class="time">{{ formatDate(a.time) }}</span>
    </div>
  </div>
</template>

<script>
import { getArticles, deleteArticle } from "@/api/articles";

export default {
  name: "ArticleList",
  data() {
    return {
      list: [],
      selected: [],
      loading: true,
      defaultIcon: "https://nav.chanriver.dpdns.org/icon.png"
    };
  },
  async mounted() {
    this.list = await getArticles();
    this.loading = false;
  },
  methods: {
    formatDate(t) {
      const d = new Date(t);
      return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    },
    async batchDelete() {
      for (const u of this.selected) {
        await deleteArticle(u);
      }
      this.list = await getArticles();
      this.selected = [];
    }
  }
};
</script>

<style scoped>
.featured-wrapper {
  padding: 10px;
}
.article-card {
  display: flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 6px;
  background: #f5f5f7;
  margin-bottom: 6px;
  transition: 0.2s;
}
.article-card:hover {
  background: #e8e8eb;
  transform: translateY(-1px);
}
.favicon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  border-radius: 4px;
}
.tag {
  background: #ddd;
  padding: 1px 5px;
  border-radius: 4px;
  margin-left: 8px;
  font-size: 12px;
}
.time {
  font-size: 12px;
  color: #666;
  margin-left: 8px;
}
</style>
