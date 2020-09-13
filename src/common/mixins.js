let mixin={
    data(){
      return{
        pageType:"small",
        pageSet:{
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['20','50','100','200'],
            total:0,
            currentPage: 1,
            pageSize : 20
        }
      };
    },
    methods:{
        pagingSettings(total,pageSize){ //全局页数 混入
          this.pageSet.total = total;
          this.pageSet.showTotal = ()=>{
              return '共 '+Math.ceil(total/this.pageSet.pageSize)+' 页 /' +total+' 条数据';
          } 
          return this.pageSet;
        }
    }
  };


  export default mixin;