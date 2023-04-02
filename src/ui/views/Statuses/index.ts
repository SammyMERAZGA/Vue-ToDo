import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import moment from "moment";
// Components
import AddStatus from "@/ui/components/Dialogs/AddStatus.vue";
import Snackbar from "@/ui/components/Snackbar.vue";
// Entities
import { Status } from "@/entities/Status";

@Component({
  components: {
    AddStatus,
    Snackbar,
  },
})
export default class Statuses extends Vue {
  statuses: Status[] = [];
  status = {
    id: 0,
    name: "",
  };

  /* DIALOG */
  updateStatusDialog = false;

  headersStatusesTable = [
    { text: "Nom", value: "name" },
    { text: "Date de création", value: "createdAt" },
    { text: "Actions", value: "actions", sortable: false },
  ];

  nameRules = [
    (v: string) => !!v || "Le nom du statut est obligatoire",
    (v: string) =>
      v.length <= 50 ||
      "Le nom de la catégorie doit faire moins de 30 caractères",
  ];

  /* CRUD */
  async getStatuses() {
    this.statuses = (await axios.get(process.env.VUE_APP_API_URL + `/status`))
      .data as Status[];
    this.statuses.forEach((status) => {
      status.createdAt = moment(status.createdAt).format("DD/MM/YYYY");
    });
  }

  editStatus(status: Status): void {
    this.status.id = status.id;
    this.status.name = status.name;
    this.updateStatusDialog = true;
  }

  updateStatus(): void {
    axios
      .post(process.env.VUE_APP_API_URL + `/status/${this.status.id}`, {
        name: this.status.name,
      })
      .then(() => {
        this.getStatuses();
        this.updateStatusDialog = false;
        this.showSnackbarUpdateStatus();
        this.status.id = 0;
      });
  }

  deleteStatus(id: number): void {
    axios.delete(process.env.VUE_APP_API_URL + `/status/${id}`).then(() => {
      this.getStatuses();
      this.showSnackbarDeleteStatus();
    });
  }

  mounted(): void {
    this.getStatuses();
  }

  /* SNACKBAR */
  showSnackbarUpdateStatus(): void {
    const snackbar = this.$refs.snackbarUpdateStatus as Snackbar;
    snackbar.show();
  }

  showSnackbarDeleteStatus(): void {
    const snackbar = this.$refs.snackbarDeleteStatus as Snackbar;
    snackbar.show();
  }

  /* OTHERS METHODS */
  clear(): void {
    this.status.name = "";
  }
}
