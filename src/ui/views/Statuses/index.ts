import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
// Components
import AddStatus from "@/ui/components/Dialogs/AddStatus.vue";
import Snackbar from "@/ui/components/Snackbar.vue";
// Entities
import { Status } from "@/entities/types/Status";
// Services
import { getStatuses, updateStatus, deleteStatus } from "@/services/index";

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

  updateStatusDialog = false;

  headersStatusesTable = [
    { text: "Nom", value: "name" },
    { text: "Icône", value: "icon" },
    { text: "Couleur", value: "color" },
    { text: "Date de création", value: "createdAt" },
    { text: "Actions", value: "actions", sortable: false },
  ];

  nameRules = [
    (v: string) => !!v || "Le nom du statut est obligatoire",
    (v: string) =>
      v.length <= 50 ||
      "Le nom de la catégorie doit faire moins de 30 caractères",
  ];

  // ========== CRUD ========== //

  async getStatuses() {
    this.statuses = await getStatuses();
    this.statuses.forEach((status) => {
      status.createdAt = moment(status.createdAt).format("DD/MM/YYYY");
    });
  }

  editStatus(status: Status): void {
    this.status.id = status.id;
    this.status.name = status.name;
    this.updateStatusDialog = true;
  }

  async updateStatus(): Promise<void> {
    await updateStatus({
      id: this.status.id,
      name: this.status.name,
    });
    this.getStatuses();
    this.updateStatusDialog = false;
    this.showSnackbarUpdateStatus();
    this.status.id = 0;
  }

  async deleteStatus(id: number): Promise<void> {
    await deleteStatus(id);
    this.getStatuses();
    this.showSnackbarDeleteStatus();
  }

  mounted(): void {
    this.getStatuses();
  }

  // ========== OTHERS METHODS ========== //

  clear(): void {
    this.status.name = "";
  }

  colorRow(item: Status) {
    const position = this.statuses.indexOf(item, 0);
    if (position % 2 == 0) {
      return "blue lighten-5";
    }
  }

  showSnackbarUpdateStatus(): void {
    const snackbar = this.$refs.snackbarUpdateStatus as Snackbar;
    snackbar.show();
  }

  showSnackbarDeleteStatus(): void {
    const snackbar = this.$refs.snackbarDeleteStatus as Snackbar;
    snackbar.show();
  }
}
