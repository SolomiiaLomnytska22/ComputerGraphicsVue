<template>
    <div class="image-uploader">
        <v-btn class="btn" variant="flat" color="#FFFFFF" @click="uploadFile">
                Upload 
                <svg-icon style = "padding-left: 5px; color: #04101A" type="mdi" :path="mdiUpload"></svg-icon>
            </v-btn>
            
         <input type="file" ref="fileInput" @change="handleImageUpload" accept="image/*" style="display: none;">
    </div>
  </template>
  
  <script>

import SvgIcon from '@jamescoyle/vue-icon';
import { mdiUpload} from '@mdi/js';

 
  export default {
    data() {
      return {
        selectedImage: null,
        uploadedFileName: " ",
        mdiUpload,
        
      };
    },
    methods: {
      handleImageUpload(event) {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
          this.selectedImage = URL.createObjectURL(selectedImage);
          this.uploadedFileName = selectedImage.name;
          console.log(this.selectedImage);
          this.$emit('file-selected', {
          selectedImage: this.selectedImage,
          uploadedFileName: this.uploadedFileName,
          
        });
        }
      },
      uploadFile() {
      this.$refs.fileInput.click(); 
    },
    },
    components: {
        SvgIcon
    }
  };
  </script>
  

  <style scoped>
 
  </style>