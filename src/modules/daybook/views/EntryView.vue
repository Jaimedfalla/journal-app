<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-sucess fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 f2-light">{{ yearDay }}</span>
      </div>

      <div>
        <input v-show="false"
          type="file"
          @change="onSelectedImage"
          ref="imageSelector"
          accept="image/png, image/jpeg, image/jpg">

        <button v-if="entry.id" @click="onDeleteEntry"
          class="btn btn-danger mx-2">
            Borrar
          <i class="fa fa-trash-alt"></i>
        </button>
        <button
          @click="selectImage"
          class="btn btn-primary">
          Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
    </div>
    <img v-if="entry.picture && !localImage"
      :src="entry.picture"
      alt="entry-picture"
      class="img-thumbnail"
    />
    <img v-if="localImage"
      :src="localImage"
      alt="entry-picture"
      class="img-thumbnail"
    />
  </template>

  <Fab :icon="'fa-save'"
    @on:click="saveEntry"/>

</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import {getDayMonthYear,uploadImage} from "../helpers/functions";
import Swal from 'sweetalert2'

export default {
  name:'EntryView',
  components: {
    Fab: defineAsyncComponent(() =>
      import("../components/FloatingActionButton.vue")
    ),
  },
  data() {
    return {
      entry: {
        text:'',
        date: new Date().toISOString()
      },
      save:this.createEntry,
      localImage:null,
      file:null
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters("journal", {
      getById: "getEntryById",
    }),
    day() {
      const { day } = getDayMonthYear(this.entry.date);

      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);

      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);

      return yearDay;
    },
  },
  methods: {
    ...mapActions('journal',['updateEntry','createEntry','deleteEntry']),
    loadEntry() {
      let entry;
      if(this.id ==='new'){
        this.entry = {
          text:'',
          date: new Date().toISOString()
        }
        this.save = this.createEntry
        this.localImage = null
        return
      }
      
      entry = this.getById(this.id);
      if (!entry) return this.$router.push({ name: "no-entry" });

      this.save = this.updateEntry
      this.entry = entry;
    },
    onSelectedImage(event){
      const file = event.target.files[0]
      if(!file){
        this.localImage = null
        this.file = null
        return
      }

      this.file=file
      const fr = new FileReader()
      fr.onload = ()=> this.localImage = fr.result
      fr.readAsDataURL(file)

    },
    selectImage(){
      this.$refs.imageSelector.click()
    },
    async saveEntry(){
      return new Promise(console.log('Guardando entrada'))
      // const creatEntry = async ()=>{
      //     const id = await this.save(this.entry)||this.id;
      //     this.$router.push({ name: "entry",params:{id} });
      //   }

      // const msgs = {
      //     title:'Guardado',
      //     text: 'Entrada registrada con éxito'
      //   }
      
      // console.log(creatEntry)
      // this.showAlerts(creatEntry,msgs)
    },
    async onDeleteEntry(){
      const {isConfirmed} = await Swal.fire({
        title:'¿Está seguro',
        text:'Una vez borrado, no se podrá recuperar',
        showDenyButton:true,
        confirmButtonText:'Sí, estoy seguro'
      })

      if(isConfirmed){
        this.showAlerts(async ()=>{
          await this.deleteEntry(this.id)
          this.$router.push({name:'no-entry'})
        },{
          title:'Eliminado',
          text:''
        })
      }
    },
    async showAlerts(method,message){
      Swal.fire({
          title:'Espere por favor',
          allowOutsideClick:false
        })

      Swal.showLoading()
      const picture = await uploadImage(this.file)
      this.entry.picture = picture;
      await method()
      Swal.fire(message.title,message.text,'success')
      this.file = null
      this.localImage = null
    }
  },
  watch: {
    id() {
      this.loadEntry();
    },
  },
  created() {
    this.loadEntry();
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: black, $alpha: 0.2);
}
</style>