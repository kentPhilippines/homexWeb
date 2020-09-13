<style lang="less" scoped>
@import './condoImport.less';
</style>

<template>
  <div class="import-page">
    condoImport
    <div class="import-row">
      <a href="static/CONDO INFO TEMPLATE.xls" download="CONDO INFO TEMPLATE.xls">
        <a-button type="primary">Download excel template</a-button>
      </a>
    </div>
    <div class="import-row" style="width:50%;">  
      <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
        <a-button><a-icon type="upload" /> Import File </a-button>
      </a-upload>
    </div>
    <div class="import-row">  
      <a-button
        type="primary"
        :disabled="fileList.length === 0"
        :loading="uploading"
        style="margin-top: 16px"
        @click="handleUpload">
        upload
      </a-button>
      <a-button @click="goback">Cancel</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'condoImport',
  data () {
    return {
      fileList: [],
      uploading: false,
    }
  },
  methods: {
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    handleUpload() {
      const { fileList } = this;
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append('files', file);
      });
      this.uploading = true;

      this.$http({
        url: this.$http.adornUrl('/dev-api/importCondoFile'),
        method: 'post',
        data: this.$http.adornData(formData)
      }).then(res => {
        if (res.status === 200) {
          this.fileList = [];
          this.uploading = false;
          this.$message.success('upload successfully.');
        } else {
          this.uploading = false;
          this.$message.error('upload failed.');
        }
      })
    },
    goback() {
      this.$store.commit('setPath', '/property/condo')
      this.$router.push('/property/condo')
    },
  }
}
</script>
