<script setup lang="ts">
import {gql} from "nuxt-graphql-request/utils";

const {$graphql} = useNuxtApp();

const query = gql`
query issues($issuesFirst: Int = 100, $labelsFirst: Int = 100) {
    repository(owner: "lucaspmarra", name: "vue-for-aspiring-front-end-engineers"){
        id
        owner {
            id
            login
            url
        }
        issues(first: $issuesFirst, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
            totalCount
            pageInfo {
                hasNextPage
                hasPreviousPage
            }
            nodes {
                number
                url
                title
                state
                author {
                    login
                }
                bodyUrl
                bodyHTML
                labels(first: $labelsFirst){
                    nodes {
                        name
                    }
                }
            }
        }
    }
}

`;

const {data: issues, error, pending, refresh, execute} = useAsyncData('issues', async () => {
  const data = await $graphql.default?.request(query);
  return data.repository.issues;

});


onMounted(() => {
  console.log('--jsdno0 debug onMounted', new Date().getTime());
});
</script>

<template>
  <UContainer class="flex align-middle justify-center">
    <div>
      <UButton
          icon="i-heroicons-arrow-path"
          size="sm"
          color="primary"
          variant="solid"
          label="Refresh"
          :trailing="false"
          @click="refresh()"
      />
      <p v-if="pending">
        pending
      </p>
      <pre v-else>
      {{ error }}
   </pre>
      {{ issues.totalCount }}
      <div class="grid grid-cols-3 gap-6">
        <UChip v-for="item in issues.nodes" :key="item.number" :text="item.number" size="3xl">
          <UCard class="mb-2 w-full h-[200px] min-w-[300px] overflow-auto">
            <template #header>
              <div style="height: 50px">
                {{ item.title }}
              </div>
            </template>


            <UBadge v-if="item.labels.nodes.length > 0" class="ml-1" v-for="(label, index) in item.labels.nodes"
                    :key="index" color="primary"
                    variant="soft">
              {{ label.name }}
            </UBadge>
            <UBadge v-else class="ml-1" color="primary"
                    variant="soft">
              Sem tag adicionada pelo contratante
            </UBadge>
          </UCard>
        </UChip>
      </div>
    </div>
  </UContainer>
</template>

<style scoped>

</style>
