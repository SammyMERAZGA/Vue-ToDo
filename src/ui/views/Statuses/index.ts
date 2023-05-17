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
    icon: "",
    color: "",
  };

  updateStatusDialog = false;
  snackbarRefresh = false;

  headersStatusesTable = [
    { text: "Nom", value: "name", class: "indigo--text text--darken-4" },
    { text: "Icône", value: "icon", class: "indigo--text text--darken-4" },
    { text: "Couleur", value: "color", class: "indigo--text text--darken-4" },
    {
      text: "Date de création",
      value: "created_at",
      class: "indigo--text text--darken-4",
    },
    {
      text: "Actions",
      value: "actions",
      sortable: false,
      class: "indigo--text text--darken-4",
    },
  ];

  icons = [
    { name: "À faire", value: "mdi-calendar-clock" },
    { name: "En cours", value: "mdi-progress-helper" },
    { name: "Terminée", value: "mdi-check-decagram" },
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
      status.created_at = moment(status.created_at).format("DD/MM/YYYY");
    });
  }

  editStatus(status: Status): void {
    this.status.id = status.id;
    this.status.name = status.name;
    this.status.icon = status.icon;
    this.status.color = status.color;
    this.updateStatusDialog = true;
  }

  async updateStatus(): Promise<void> {
    await updateStatus({
      id: this.status.id,
      name: this.status.name,
      icon: this.status.icon,
      color: this.status.color,
    });
    this.getStatuses();
    this.updateStatusDialog = false;
    this.showSnackbarUpdateStatus();
    this.status.id = 0;
    this.clear();
  }

  async deleteStatus(id: number): Promise<void> {
    await deleteStatus(id);
    this.showSnackbarDeleteStatus();
    this.getStatuses();
  }

  mounted(): void {
    this.getStatuses();
  }

  // ========== OTHERS METHODS ========== //

  clear(): void {
    this.status.name = "";
    this.status.icon = "";
    this.status.color = "";
  }

  goToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  colorRow(item: Status) {
    const position = this.statuses.indexOf(item, 0);
    if (position % 2 == 0) {
      return "pink lighten-5";
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

  isActionButtonDisabled(name: string): boolean {
    return name === "En cours" || name === "À faire" || name === "Terminée";
  }

  refresh(): void {
    this.getStatuses();
    const snackbar = this.$refs.snackbarRefresh as Snackbar;
    snackbar.show();
  }
}
