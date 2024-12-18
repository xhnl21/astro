<template>
  <aside class="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-indigo-500">
    <div class="sidebar-header flex items-center justify-center py-4">
      <div class="inline-flex">
        <a href="/" class="inline-flex flex-row items-center">
          <svg class="w-10 h-10 text-red-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11.757 2.034a1 1 0 01.638.519c.483.967.844 1.554 1.207 2.03.368.482.756.876 1.348 1.467A6.985 6.985 0 0117 11a7.002 7.002 0 01-14 0c0-1.79.684-3.583 2.05-4.95a1 1 0 011.707.707c0 1.12.07 1.973.398 2.654.18.374.461.74.945 1.067.116-1.061.328-2.354.614-3.58.225-.966.505-1.93.839-2.734.167-.403.356-.785.57-1.116.208-.322.476-.649.822-.88a1 1 0 01.812-.134zm.364 13.087A2.998 2.998 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879.586.585.879 1.353.879 2.121s-.293 1.536-.879 2.121z" clip-rule="evenodd" /></svg>
          <span class="leading-10 text-gray-100 text-2xl font-bold ml-1 uppercase">Furion</span>
        </a>
      </div>
    </div>
    <div class="sidebar-content px-4 py-6">
      <ul class="flex flex-col w-full">
        <span v-for="(item, index) in datos" :key="index">
          <li class="my-px" v-if="item.title !== ''">
            <span class="flex font-medium text-sm text-gray-300 px-4 my-4 uppercase"> {{ item.title }}</span>
          </li>
          <li v-for="(sub, i) in item.value" :key="i" class="my-px">
            <a v-if="pathname === sub.path" :href="sub.url" class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 bg-gray-100">
              <span class="flex items-center justify-center text-lg text-gray-400">
                <svg v-html="sub.icon" class="h-6 w-6"></svg>
              </span>
              <span class="ml-3">{{ sub.subtitle }}</span>
            </a>
            <a v-else :href="sub.url" class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300 hover:bg-gray-100 hover:text-gray-700">
              <span class="flex items-center justify-center text-lg text-gray-400">
                <svg v-html="sub.icon" class="h-6 w-6"></svg>
              </span>
              <span class="ml-3">{{ sub.subtitle }}</span>
            </a>
          </li>          
        </span>
      </ul>
    </div>
  </aside>  
</template>
<script>
export default {
    name: 'Menu',
    data() {
      return {
        pathname:'',
        datos: [
          {
              title: "",
              value:[
                {
                  subtitle: 'Dashboard',
                  path:'/',
                  icon: '<svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>',
                  url: '/'
                },
              ],
          },      
          {
              title: "PROJECTS",
              value:[
                {
                  subtitle: 'Table',
                  path:'table',
                  icon: '<svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6" ><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>',
                  url: '/table'
                },
                {
                  subtitle: 'New Project',
                  path:'#',
                  icon: '<svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6"><path d="M12 4v16m8-8H4" /></svg>',
                  url: '#'
                },
              ],
          },
          {
              title: "ACCOUNT",
              value:[
                {
                  subtitle: 'Profile',
                  path:'#',
                  icon: '<svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>',
                  url: '#'
                },
                {
                  subtitle: 'Settings',
                  path:'#',
                  icon: '<svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
                  url: '#'
                },
              ],
          }          
        ],        
      };
    },
    created() {},
    mounted() {
      this.menuActive();
    },
    methods:{
      menuActive(){
        let nativeUrl = window.location.pathname;
        let url = nativeUrl.split('/').slice(0, 2).join('/');
        let rsUrl = url.split('/');
        console.log(rsUrl[1]);

        if (rsUrl[1] === '') {
          this.pathname = '/';
        } else {
          this.pathname = rsUrl[1];
        }
      },      
    },
    computed: {},  
};
</script>  